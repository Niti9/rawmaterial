import Head from "next/head";

const PageTitle = ({ mainTitle, pageTitle, subTitle }) => {
  return (
    <>
      {/* Set the Page Title in the Browser Tab */}
      <Head>
        <title>{pageTitle} | MyApp</title>
      </Head>

      {/* Page Title and Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-slate-900 dark:text-slate-200 text-lg font-medium">
          {/* <h4 className="text-slate-900 dark:text-slate-200 text-lg font-medium"> */}
          {pageTitle}
        </h4>

        {/* Breadcrumb Navigation */}
        <div className="md:flex hidden items-center gap-2.5 text-sm font-semibold">
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="text-sm font-medium text-slate-700 dark:text-slate-400"
            >
              {/* Home  */}
              {subTitle ? mainTitle : "home"}
            </a>
          </div>

          {subTitle && (
            <div className="flex items-center gap-2">
              {pageTitle && (
                <i className="mgc_right_line text-lg flex-shrink-0 text-slate-400 rtl:rotate-180"></i>
              )}
              <span className="text-sm font-medium text-slate-700 dark:text-slate-400">
                {subTitle}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            {subTitle && (
              <i className="mgc_right_line text-lg flex-shrink-0 text-slate-400 rtl:rotate-180"></i>
            )}
            <span
              className="text-sm font-medium text-slate-700 dark:text-slate-400"
              aria-current="page"
            >
              {pageTitle}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageTitle;
