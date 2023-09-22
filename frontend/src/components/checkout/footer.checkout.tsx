const Footer = () => {
  return (
    <>
      <footer
        aria-labelledby="footer-heading"
        className="border-t border-gray-200 bg-white"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-100 py-10 text-center">
            <p className="text-sm text-gray-500">
              &copy; 2023 LevelUpSchool Assesment.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
