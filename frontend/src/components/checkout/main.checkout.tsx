import { useEffect, useState } from "react";
import { SubmitHandler, SubmitErrorHandler, useForm } from "react-hook-form";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { coerce, object, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { checkoutFn } from "../../api/checkoutApi";

// Static products to display
const products = [
  {
    id: 1,
    title: "Basic Tee",
    href: "#",
    price: "₦7500.00",
    color: "White",
    size: "Large",
    imageSrc:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/64/986649/1.jpg?6655",
    imageAlt: "Front of men's Basic Tee in white.",
  },
  // More products...
];

// Static delivery methods supported
const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: 500.0,
  },
  {
    id: 2,
    title: "Express",
    turnaround: "2–5 business days",
    price: 1600.0,
  },
];

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

// Model type and validation for checkout data
const checkoutSchema = object({
  cardName: coerce.string(),
  cardNumber: coerce.string(),
  expiryMonth: coerce.string(),
  expiryYear: coerce.string(),
  ccv: coerce.string(),
});

const taxes = 50.25;

export type CheckoutInput = TypeOf<typeof checkoutSchema>;

const Main = () => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0],
  );
  const [cardNumber, setCardNumber] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [ccvPin, setCcvPin] = useState("");

  useEffect(() => {
    setSubTotal(7500 * quantity);
  }, []);

  useEffect(() => {
    setTotal(subTotal + selectedDeliveryMethod.price + taxes);
  }, [subTotal]);

  useEffect(() => {
    setTotal(subTotal + selectedDeliveryMethod.price + taxes);
  }, [selectedDeliveryMethod]);

  useEffect(() => {
    setSubTotal(7500 * quantity);
  }, [quantity]);

  const methods = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
  });

  const { register, handleSubmit } = methods;

  // Called when payment is submitted and zod validation is successful
  const checkoutSubmitHandler: SubmitHandler<CheckoutInput> = async (data) => {
    const updatedData = {
      ...data,
      cardNumber: data.cardNumber.replace(/\s/g, ""),
    };
    checkoutFn(updatedData)
      .then((result) => {
        toast("Checokut successful", {
          type: "success",
          position: "top-right",
        });
      })
      .catch((error) => {
        const errorMessage: string[] =
          error.response.data.message ||
          error.response.data.detail ||
          error.message ||
          error.toString();
        errorMessage.forEach((message) =>
          toast(message, {
            type: "error",
            position: "top-right",
          }),
        );
      });
  };

  // Called when payment is submitted and zod validation fails
  const checkoutErrorHandler: SubmitErrorHandler<CheckoutInput> = async (
    error,
  ) => {
    console.log(error);
  };

  // Called when card number is typed, this adds a space in between 4 digit groups and ensure only numbers can be added
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValueWithoutNonDigits = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    const formattedValue = inputValueWithoutNonDigits.replace(
      /(\d{4})(?=\d)/g,
      "$1 ",
    ); // Add a space every four characters

    setCardNumber(formattedValue);
  };

  // Called when either exp month/year or ccv is being typed, this ensures only didgits are added
  // while maintaining the base validation defined on the input elements
  const handleNumberOnlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    switch (e.target.name) {
      case "expiryMonth":
        setExpMonth(formattedValue);
        break;
      case "expiryYear":
        setExpYear(formattedValue);
        break;
      case "ccv":
        setCcvPin(formattedValue);
        break;
    }
  };

  // Called when order quantity is changed
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <form
            onSubmit={handleSubmit(checkoutSubmitHandler, checkoutErrorHandler)}
            className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          >
            <div>
              <div>
                <h2 className="text-center text-lg font-medium text-gray-900">
                  CheckOut
                </h2>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <RadioGroup
                  value={selectedDeliveryMethod}
                  onChange={setSelectedDeliveryMethod}
                >
                  <RadioGroup.Label className="text-lg font-medium text-gray-900">
                    Delivery method
                  </RadioGroup.Label>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {deliveryMethods.map((deliveryMethod) => (
                      <RadioGroup.Option
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        className={({ checked, active }) =>
                          classNames(
                            checked ? "border-transparent" : "border-gray-300",
                            active ? "ring-2 ring-indigo-500" : "",
                            "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none",
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <div className="flex flex-1">
                              <div className="flex flex-col">
                                <RadioGroup.Label
                                  as="span"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  {deliveryMethod.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-1 flex items-center text-sm text-gray-500"
                                >
                                  {deliveryMethod.turnaround}
                                </RadioGroup.Description>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-6 text-sm font-medium text-gray-900"
                                >
                                  {`₦${deliveryMethod.price}`}
                                </RadioGroup.Description>
                              </div>
                            </div>
                            {checked ? (
                              <CheckCircleIcon
                                className="h-5 w-5 text-indigo-600"
                                aria-hidden="true"
                              />
                            ) : null}
                            <div
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-lg",
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Payment */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                  <div className="col-span-4">
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card number
                    </label>
                    <div className="mt-1">
                      <input
                        value={cardNumber}
                        type="text"
                        id="card-number"
                        autoComplete="cc-number"
                        required
                        {...register("cardNumber")}
                        onChange={handleCardNumberChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-4">
                    <label
                      htmlFor="name-on-card"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name on card
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name-on-card"
                        autoComplete="cc-name"
                        required
                        {...register("cardName")}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label
                      htmlFor="expiration-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiration date (MM/YY)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="expiration-month"
                        placeholder="MM"
                        minLength={2}
                        maxLength={2}
                        size={3}
                        value={expMonth}
                        autoComplete="cc-exp-month"
                        required
                        {...register("expiryMonth")}
                        onChange={handleNumberOnlyChange}
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <span className="mx-7">/</span>
                      <input
                        type="text"
                        id="expiration-year"
                        placeholder="YY"
                        minLength={2}
                        maxLength={2}
                        value={expYear}
                        size={3}
                        autoComplete="cc-exp-year"
                        required
                        {...register("expiryYear")}
                        onChange={handleNumberOnlyChange}
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="ccv"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CCV
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="ccv"
                        placeholder="CVV/CVC"
                        minLength={3}
                        maxLength={4}
                        value={ccvPin}
                        autoComplete="ccv"
                        required
                        {...register("ccv")}
                        onChange={handleNumberOnlyChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pay */}
              <div className="mt-10 flex justify-center border-t border-gray-200 pt-6">
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Pay now
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <li key={product.id} className="flex px-4 py-6 sm:px-6">
                      <div className="flex-shrink-0">
                        <img
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          className="w-20 rounded-md"
                        />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <a
                                href={product.href}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.title}
                              </a>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.size}
                            </p>
                          </div>

                          <div className="ml-4 flow-root flex-shrink-0">
                            <button
                              type="button"
                              className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <TrashIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-1 items-end justify-between pt-2">
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {product.price}
                          </p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                            <select
                              id="quantity"
                              name="quantity"
                              onChange={handleQuantityChange}
                              className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {`₦${subTotal}`}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">{`₦${selectedDeliveryMethod.price}`}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {`₦${taxes}`}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      {`₦${total}`}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Confirm order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Main;
