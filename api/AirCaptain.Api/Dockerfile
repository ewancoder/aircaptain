FROM mcr.microsoft.com/dotnet/aspnet:9.0-noble-chiseled AS base
USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:9.0-noble AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Directory.Build.props", "."]
COPY ["Directory.Packages.props", "."]
COPY ["AirCaptain.Api/AirCaptain.Api.csproj", "AirCaptain.Api/"]
RUN dotnet restore "AirCaptain.Api/AirCaptain.Api.csproj"
COPY . .
WORKDIR "/src/AirCaptain.Api"
RUN dotnet build "./AirCaptain.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./AirCaptain.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final

COPY --from=ewancoder/healthcheck:latest /healthcheck /healthcheck
HEALTHCHECK CMD ["/healthcheck"]

WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AirCaptain.Api.dll"]
