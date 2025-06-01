import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [EventsGateway],
  exports: [],
})
export class WebsocketModule {}
