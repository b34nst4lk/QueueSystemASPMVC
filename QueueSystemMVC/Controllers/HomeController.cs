using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QueueSystemMVC.Models;

namespace QueueSystemMVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly QueueService _queueService;

        public HomeController(QueueService queueService)
        {
            _queueService = queueService;
        }

        public ActionResult Register()
        {
            return View();
        }

        public JsonResult SignIn(char id)
        {
            Queue q = _queueService.SignIn((QueueType) id);
            return new JsonResult() {
                Data = q,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult Reenroll(int id)
        {
            Queue q = _queueService.Reenroll(id);

            return new JsonResult()
            {
                Data = q,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }
}