import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthGuard } from '../../shared/auth.guard';
import { ValidationPipe } from '../../shared/validation.pipe';
import { AccountDTO, CreateAccountDTO } from './account.dto';

@Controller()
export class AccountController {
  constructor(private accountService: AccountService) {}

  //TODO: Verify Admin
  @Get('accounts')
  @UseGuards(new AuthGuard())
  showAllAccount() {
    return this.accountService.getListAccounts();
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() accountDTO: AccountDTO) {
    return this.accountService.login(accountDTO);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() accountDTO: CreateAccountDTO) {
    return this.accountService.register(accountDTO);
  }
}
