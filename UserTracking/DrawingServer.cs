using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace UserTracking
{
    public class DrawingServer : Hub
    {
        public Task SendDrawing(int xOffset, int yOffset, string color)
        {
            return Clients.AllExcept(Context.ConnectionId).receiveDrawing(xOffset, yOffset, color);
        }

        public Task BroadcastClear()
        {
            return Clients.AllExcept(Context.ConnectionId).clear();
        }
    }
}