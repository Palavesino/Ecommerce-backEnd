import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import MercadoPagoConfig, { Preference } from 'mercadopago';

@Injectable()
export class MercadoPagoService {
    private client: MercadoPagoConfig;

    constructor(private configService: ConfigService) {
        const accessToken = this.configService.get<string>('MP_ACCESS_TOKEN');

        this.client = new MercadoPagoConfig({
            accessToken: accessToken!,
        });
    }

    async createPreference(total: number) {
        try {
            const preference = new Preference(this.client);

            const frontendUrl =
                this.configService.get<string>('FRONTEND_URL');

            const body = {
                items: [
                    {
                        id: '1',
                        title: 'El Buen Sabor — Pedido',
                        quantity: 1,
                        unit_price: Number(total),
                        currency_id: 'ARS',
                    },
                ],

                back_urls: {
                    success: `${frontendUrl}/orden/success`,
                    failure: `${frontendUrl}/orden/failure`,
                    pending: `${frontendUrl}/orden/pending`,
                },
                auto_return: 'approved',
            };

            const result = await preference.create({
                body,
            });

            return {
                preferenceId: result.id,
            };
        } catch (error) {
            throw error;
        }
    }
}