using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QueueSystemMVC.Models
{
    interface IQueueService
    {
        Queue SignIn(QueueType qType);
        Queue CallNext(int counterNo, QueueType qType);
        Queue GetQueueByQueueNo(int id);
        Queue Skip(int id);
        Queue Reenroll(int id);
    }
}
