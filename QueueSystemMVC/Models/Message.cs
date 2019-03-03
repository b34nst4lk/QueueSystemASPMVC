using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QueueSystemMVC.Models
{
    public static class Type
    {
        public readonly static string CALL_NEXT = "call_next";
        public readonly static string CALL_AGAIN = "call_again";
        public readonly static string SKIP_NUMBER = "skip_number";
        public readonly static string REENROLL = "reenroll";
    }

    public class Message
    {
        public Message(string type, Queue q)
        {
            Type = type;
            Queue = q;
        }

        public string Type { get; set; }
        public Queue Queue { get; set; }
    }
}