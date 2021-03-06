import { HttpService, Injectable } from '@nestjs/common';
import { IGeocodeResponse } from './interfaces/geocode-response.interface';
import { IRoutingResponse } from './interfaces/routing-rsponse.interface';

// here service
// @author von Kirschbaum

@Injectable()
export class HereService {
  private appId = process.env.HERE_APP;
  private appKey = process.env.HERE_KEY;

  private static baseUrlGeocoding = 'https://geocoder.api.here.com/6.2/';
  private static geocodingPath = 'geocode.json';

  private static baseUrlRouting = 'https://route.api.here.com/routing/7.2/';
  private static routingPath = 'calculateroute.json';

  constructor(private readonly httpService: HttpService) {
  }

  private buidlPath(base: string, path: string) {
    return `${base}${path}?app_code=${this.appKey}&app_id=${this.appId}`;
  }

  public async geocode(searchtext: string): Promise<IGeocodeResponse> {
    const url = `${this.buidlPath(HereService.baseUrlGeocoding, HereService.geocodingPath)}&searchtext=${encodeURIComponent(searchtext)}`;
    const response = await this.httpService.get(url).toPromise();
    return response.data as IGeocodeResponse;
  }

  public async routing(latDestination: number, lngDestination: number, lat: number, lng: number): Promise<IRoutingResponse> {
    const url = `${this.buidlPath(HereService.baseUrlRouting, HereService.routingPath)}&` +
      `waypoint0=geo!${lat},${lng}&waypoint1=geo!${latDestination},${lngDestination}&mode=fastest;car;traffic:disabled`;
    return (await this.httpService.get(url).toPromise()).data as IRoutingResponse;
  }
}
