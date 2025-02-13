import { Injectable } from '@nestjs/common';
import axios from 'axios'; // Ensure axios is properly imported
import { getIpFromRequest } from 'utils/getIpHelper';

@Injectable()
export class RolesService {
  async getRole(request: Request): Promise<string> {
    const ip = getIpFromRequest(request);

    const responseIpApi: { data: { countryCode: string } } = await axios.get(
      `${process.env.IP_API_URL}/${ip}`,
    );

    const responseRoleApi: { data: { ads: string } } = await axios.get(
      `${process.env.ROLE_API_URL}`,
      {
        params: {
          countryCode: responseIpApi.data.countryCode,
        },
        auth: {
          username: `${process.env.ROLE_API_USERNAME}`,
          password: `${process.env.ROLE_API_PASSWORD}`,
        },
      },
    );

    return responseRoleApi.data.ads === 'sure, why not!' ? 'ADMIN' : 'USER';
  }
}
