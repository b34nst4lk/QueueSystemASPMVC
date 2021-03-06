﻿using System.Web;
using System.Web.Optimization;

namespace QueueSystemMVC
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            // JQuery
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/display").Include(
                "~/CustomStyles/display.css" 
            ));

            // Registration Scripts
            ScriptBundle registration = new ScriptBundle("~/bundles/registration");

            registration.Include(
                "~/CustomScripts/common.js",
                "~/CustomScripts/input_filter.js",
                "~/CustomScripts/registration.js"
            );

            bundles.Add(registration);

            // Counter Scripts        
            ScriptBundle counter = new ScriptBundle("~/bundles/counter");

            counter.Include(
                "~/CustomScripts/common.js",
                "~/CustomScripts/input_filter.js",
                "~/CustomScripts/counter.js"
            );

            bundles.Add(counter);

            // Display 
            bundles.Add(new ScriptBundle("~/bundles/display").Include(
                "~/CustomScripts/common.js",
                "~/CustomScripts/display.js"
            ));
        }
    }
}
