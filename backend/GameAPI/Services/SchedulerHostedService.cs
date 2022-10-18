using System;
using System.Threading;
using System.Threading.Tasks;
using GameAPI.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace GameAPI.Services
{
    public class SchedulerHostedService : HostedServiceBase
    {
        private readonly ILogger<SchedulerHostedService> _logger;
        private readonly IOptions<TimerServiceConfiguration> _options;
        private readonly IHubContext<ChatHub> _hubContext;

        private readonly Random _random = new Random();

        public SchedulerHostedService(
          ILoggerFactory loggerFactory,
          IOptions<TimerServiceConfiguration> options,
          IHubContext<ChatHub> hubContext)
        {
            _logger = loggerFactory.CreateLogger<SchedulerHostedService>();
            _options = options;
            _hubContext = hubContext;
        }

        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            var val = 0;
            while (!cancellationToken.IsCancellationRequested)
            {
                val += 5;
                if(val >= 100) val = 0;
                var randomValue = val;//_random.Next(0, 100);

                //_logger.LogInformation($"Sending newCpuValue {randomValue}...");

                //await _hubContext.Clients.All.SendAsync("newCpuValue", randomValue);
                
                
                await Task.Delay(TimeSpan.FromMilliseconds(_options.Value.Period), cancellationToken);
            }
        }
    }
}
