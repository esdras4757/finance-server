import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('byUserId/:userId')
  getDashboardData( @Param('userId') userId: string) {
    console.log(userId);
    return this.dashboardService.getDashboardData(userId);
  }
}
