import { Cron } from '@nestjs/schedule';
import { environment } from '../environment/environment';
import { Inject, Injectable } from '@nestjs/common';
import { IRepoHoliday } from '@app/domain/IRepository/IRepoHoliday';
import { Holiday } from '@app/domain/model/Holiday';
import { HttpHolidayFetchService } from '@app/services/http-holiday-fetch.service';

@Injectable()
export class HolidaysSyncService {
  constructor(
    @Inject('IRepoHoliday') private holidayRepository: IRepoHoliday,
    @Inject(HttpHolidayFetchService)
    private holidayHttpService: HttpHolidayFetchService,
  ) {}

  @Cron('0 0 1 1 *')
  async fetchAndStoreHolidays(): Promise<void> {
    console.log('fetching holidays');
    await this.holidayRepository.deleteAll();
    const year = new Date().getFullYear();
    const url = `${environment.apiUrl}${year}.json`;

    try {
      const holidaysData = await this.holidayHttpService.fetchHolidaysData(url);
      for (const [dateStr, name] of Object.entries(holidaysData)) {
        const date = new Date(dateStr);

        const holiday = new Holiday(date, name as string);
        await this.holidayRepository.save(holiday);
      }
      console.log('done fetching holidays');
    } catch (error) {
      console.error('Error fetching holidays:', error);
      throw error;
    }
  }
}