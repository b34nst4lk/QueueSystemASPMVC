using System.Collections.Generic;
using System.Linq;

namespace QueueSystemMVC.Models
{
    public enum QueueStatus
    {
        Waiting,
        Calling,
        Called,
        Missed
    }

    public enum QueueType
    {
        Registered = 'R',
        WalkIn = 'W'
    }

    public class QueueService: IQueueService
    {
        private QueueSystemEntities context = new QueueSystemEntities();

        public Queue SignIn(QueueType qType)
        {
            Queue q = new Queue(qType);
            context.Queues.Add(q);
            context.SaveChanges();
            return q;
        }

        public Queue CallNext(int counterNo, QueueType qType)
        {
            string queueType = ((char)qType).ToString();
            List<Queue> queues = context.Queues
                .Where(q => q.Status == (int)QueueStatus.Waiting && q.QueueType == queueType)
                .OrderBy(q => q.CreatedAt)
                .ToList();

            if (queues.Count == 0)
            {
                return null;
            }

            Queue queue = queues.First();
            queue.Status = (int)QueueStatus.Calling;
            queue.CounterNo = counterNo;
            context.SaveChanges();
            return queue;
        }

        public Queue GetQueueByQueueNo(int id)
        {
            IQueryable<Queue> queue = context.Queues.Where(q => q.QueueNo == id);

            if (queue.Count() == 0)
                return null;

            return context.Queues.First(q => q.QueueNo == id);
        }

        public Queue Skip(int id)
        {
            Queue queue = GetQueueByQueueNo(id);
            queue.Status = (int)QueueStatus.Missed;
            context.SaveChanges();
            return queue;
        }

        public Queue Reenroll(int id)
        {
            Queue queue = GetQueueByQueueNo(id);
            if (!(queue is null) && queue.Status != (int) QueueStatus.Called)
            {
                queue.Status = (int) QueueStatus.Waiting;
            }
            return queue;
        }
    }
}