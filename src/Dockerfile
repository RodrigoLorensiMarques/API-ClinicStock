FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5124

ENV ASPNETCORE_URLS=http://+:5124
ENV ASPNETCORE_ENVIRONMENT=Development

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["API-ClinicStock.csproj", "src/"]
RUN dotnet restore "src/API-ClinicStock.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "API-ClinicStock.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "API-ClinicStock.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API-ClinicStock.dll"]
