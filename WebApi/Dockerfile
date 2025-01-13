FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5124

ENV ASPNETCORE_URLS=http://+:5124
ENV ASPNETCORE_ENVIRONMENT=Development

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG configuration=Release
WORKDIR /WebApi
COPY ["API-ClinicStock.csproj", "WebApi/"]
RUN dotnet restore "WebApi/API-ClinicStock.csproj"
COPY . .
WORKDIR "/WebApi"
RUN dotnet build "API-ClinicStock.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "API-ClinicStock.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API-ClinicStock.dll"]
