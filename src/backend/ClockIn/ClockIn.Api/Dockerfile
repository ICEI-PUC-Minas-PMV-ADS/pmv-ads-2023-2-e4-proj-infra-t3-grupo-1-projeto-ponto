#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base

RUN sed -i'.bak' 's/$/ contrib/' /etc/apt/sources.list
RUN apt-get update; apt-get install -y ttf-mscorefonts-installer fontconfig

WORKDIR /app
EXPOSE 80
EXPOSE 443

ENV ASPNETCORE_URLS=http://+;
ENV ASPNETCORE_ENVIRONMENT=Development

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["ClockIn.Api/ClockIn.Api.csproj", "ClockIn.Api/"]
COPY ["ClockIn.Application/ClockIn.Application.csproj", "ClockIn.Application/"]
COPY ["ClockIn.Domain/ClockIn.Domain.csproj", "ClockIn.Domain/"]
COPY ["ClockIn.Infra.Data/ClockIn.Infra.Data.csproj", "ClockIn.Infra.Data/"]
COPY . .
WORKDIR "/src/ClockIn.Api"
RUN dotnet build "ClockIn.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ClockIn.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ClockIn.Api.dll"]