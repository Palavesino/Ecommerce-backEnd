import { Body, Controller, Get, Post } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';


@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mpService: MercadoPagoService) {}

  @Post('/create-preference')
  async createPreference(@Body('total') total: number) {
   return this.mpService.createPreference(total);
  }

}