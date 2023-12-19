import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Job } from "../entity/job";
import { JOB_DETAILS_URL, JOB_ID_URL } from "../shared/service-endpoints";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HackerNewsJobsService {
  constructor(private readonly httpClient: HttpClient) {
  }

  public getAllJobIds(): Observable<number[]> {
    return this.httpClient.get<number[]>(JOB_ID_URL);
  }

  public getJobDetails(id: number): Observable<Job> {
    return this.httpClient.get<Job>(`${JOB_DETAILS_URL}/${id}.json`)
  }
}
