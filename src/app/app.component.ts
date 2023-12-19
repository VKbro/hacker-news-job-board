import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HackerNewsJobsService } from "./service/hacker-news-jobs.service";
import { Job } from "./entity/job";
import { Page } from "./entity/page";
import { DateTimeFormatPipe } from "./pipe/date-time-format.pipe";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DateTimeFormatPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  private page: Page;
  public jobs: Job[];
  public jobsToBeShown: Job[]
  public shouldDisableLoadMoreButton: boolean = false;

  constructor(private readonly hackerJobs: HackerNewsJobsService) {
    this.jobs = [];
    this.jobsToBeShown = [];
    this.initializeJobs();
    setTimeout(() => this.loadMoreJobs(), 2000);
    this.page = {currentPage: 0, itemsPerPage: 6}
  }

  public initializeJobs(): void {
    this.hackerJobs.getAllJobIds().subscribe({
      next: (jobIds: number[]): void => {
        jobIds.forEach((id: number): void => {
          this.hackerJobs.getJobDetails(id).subscribe((job: Job): void => {
            this.jobs.push(job)
            console.log(job)
          });
        });
      },
      complete: () => console.log('jobs loaded'),
      error: () => console.log('error fetching jobs'),
    });
  }

  public loadMoreJobs(): void {
    this.page.currentPage++;
    this.paginate().forEach(job => this.jobsToBeShown.push(job));
    if (this.jobs.length === this.jobsToBeShown.length) {
      this.shouldDisableLoadMoreButton = true;
    }
  }

  public paginate() {
    const startIndex = (this.page.currentPage - 1) * this.page.itemsPerPage;
    const endIndex = Math.min(startIndex + this.page.itemsPerPage, this.jobs.length);
    return this.jobs.slice(startIndex, endIndex);
  }
}
