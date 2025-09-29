using Tyr.Framework;

var isDebug = false;
#if DEBUG
isDebug = true;
#endif

var builder = TyrApplication.CreateBuilder(args);

var config = TyrHostConfiguration.Default(
    builder.Configuration,
    "AirCaptain",
    isDebug: isDebug);

await builder.ConfigureTyrApplicationBuilderAsync(config);

var app = builder.Build();
app.ConfigureTyrApplication(config);

await app.RunAsync();
