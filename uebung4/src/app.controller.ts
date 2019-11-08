import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

export interface IDelivery {
  lat: number;
  lon: number;
  temp: number;
}

export interface IDeliveryUpdate {
  lat: number;
  lon: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post(':id')
  createJob(@Param('id') id: number, @Body()delivery: IDelivery) {
    // Input validation
    if (id === null || id === undefined || id < 0 || id > 2) {
      // TODO ist der Error Code richtig?
      throw new HttpException('Id is out of range or not defined', 400);
    }
    if (delivery.lat === null || delivery.lat === undefined || delivery.lat < -90 || delivery.lat > 90) {
      // TODO ist der Error Code richtig?
      throw new HttpException('Lat is out of range or not defined', 400);
    }
    if (delivery.lon === null || delivery.lon === undefined || delivery.lon < -180 || delivery.lon > 180) {
      // TODO ist der Error Code richtig?
      throw new HttpException('Lat is out of range or not defined', 400);
    }
    this.appService.createJob(id, delivery.lat, delivery.lon, delivery.temp);
  }

  @Delete(':id')
  deleteJob(@Param('id') id: number) {
    // Input validation
    if (id === null || id === undefined || id < 0 || id > 2) {
      // TODO ist der Error Code richtig?
      throw new HttpException('Id is out of range or not defined', 400);
    }
    this.appService.deleteJob(id);
  }

  @Put(':id')
  updateJob(@Param('id') id: number, @Body()delivery: IDeliveryUpdate) {
    // Input validation
    if (id === null || id === undefined || id < 0 || id > 2) {
      // TODO ist der Error Code richtig?
      throw new HttpException('Id is out of range or not defined', 400);
    }
    if (delivery.lat === null || delivery.lat === undefined || delivery.lat < -90 || delivery.lat > 90) {
      // TODO ist der Error Code richtig?
      throw new HttpException('Lat is out of range or not defined', 400);
    }
    if (delivery.lon === null || delivery.lon === undefined || delivery.lon < -180 || delivery.lon > 180) {
      // TODO ist der Error Code richtig?
      throw new HttpException('Lat is out of range or not defined', 400);
    }
    this.appService.updateJob(id, delivery.lat, delivery.lon);
  }
}