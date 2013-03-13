using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserTracking
{
    public class TrackingServer : PersistentConnection
    {
        //protected override Task OnConnected(IRequest request, string connectionId)
        //{
        //    return Connection.Broadcast("Hello");
        //}

        protected override Task OnReceived(IRequest request, string connectionId, string data)
        {
            return Connection.Broadcast(data, connectionId);
        }
    }
}
