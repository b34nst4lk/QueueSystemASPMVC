using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QueueSystemMVC.Models;

namespace QueueSystemMVC.Controllers
{
    public class CounterController : Controller
    {
        private readonly QueueService _queueService;
        private readonly DisplayWebSocket _client;

        public CounterController(QueueService queueService, DisplayWebSocket client)
        {
            _queueService = queueService;
            _client = client;
        }

        public ActionResult Registered()
        {
            ViewData["QueueType"] = "RegisteredCallNext";
            return View("Counter");
        }

        public ActionResult WalkIn()
        {
            ViewData["QueueType"] = "WalkInCallNext";
            return View("Counter");
        }

        public JsonResult RegisteredCallNext(int id)
        {
            Queue q = _queueService.CallNext(id, QueueType.Registered);
            if (!(q is null)) _client.CallNext(q);
            return new JsonResult()
            {
                Data = q is null ? new Queue() : q,
                JsonRequestBehavior=JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult WalkInCallNext(int id)
        {
            Queue q = _queueService.CallNext(id, QueueType.WalkIn);
            if (!(q is null)) _client.CallNext(q);
            return new JsonResult()
            {
                Data = q is null ? new Queue() : q,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult CallAgain(int id)
        {
            Queue q = _queueService.GetQueueByQueueNo(id);
            _client.CallAgain(q);
            return new JsonResult() {
                Data=q,
                JsonRequestBehavior=JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult Skip(int id)
        {
            Queue q = _queueService.Skip(id);
            _client.SkipNumber(q);
            return new JsonResult()
            {
                Data = q,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }
    }
}