using Tyr.Framework;

var isDebug = false;
#if DEBUG
isDebug = true;
#endif

DotNetEnv.Env.Load("/run/secrets/global-secrets.env");
DotNetEnv.Env.Load("/run/secrets/secrets.env");

var builder = WebApplication.CreateBuilder(args);

var config = TyrHostConfiguration.Default(
    builder.Configuration,
    "AirCaptain",
    isDebug: isDebug);

await builder.ConfigureTyrApplicationBuilderAsync(config);

var app = builder.Build();
app.ConfigureTyrApplication(config);

await app.RunAsync();
