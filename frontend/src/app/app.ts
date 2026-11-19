import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface JobApplication {
  id: number;
  company: string;
  position: string;
  status: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h1>Job Application Manager</h1>

    <h2>{{ editingId === null ? 'Add Application' : 'Edit Application' }}</h2>

    <form (ngSubmit)="saveApplication()">
      <input
        name="company"
        [(ngModel)]="company"
        placeholder="Company"
        required
      />

      <input
        name="position"
        [(ngModel)]="position"
        placeholder="Position"
        required
      />

      <select name="status" [(ngModel)]="status">
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <button type="submit">
        {{ editingId === null ? 'Add' : 'Save' }}
      </button>

      @if (editingId !== null) {
        <button type="button" (click)="resetForm()">Cancel</button>
      }
    </form>

    <h2>My Applications</h2>

    <ul>
      @for (application of applications(); track application.id) {
        <li>
          {{ application.company }} -
          {{ application.position }} -
          {{ application.status }}

          <button (click)="editApplication(application)">Edit</button>
          <button (click)="deleteApplication(application.id)">Delete</button>
        </li>
      } @empty {
        <li>No applications found.</li>
      }
    </ul>
  `
})
export class App implements OnInit {

  private http = inject(HttpClient);
  private readonly apiUrl = '/api/applications';

  applications = signal<JobApplication[]>([]);

  company = '';
  position = '';
  status = 'Applied';
  editingId: number | null = null;

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.http.get<JobApplication[]>(this.apiUrl)
      .subscribe(data => this.applications.set(data));
  }

  saveApplication(): void {
    const application = {
      company: this.company,
      position: this.position,
      status: this.status
    };

    if (this.editingId === null) {
      this.http.post<JobApplication>(this.apiUrl, application)
        .subscribe(() => {
          this.loadApplications();
          this.resetForm();
        });
    } else {
      this.http.put<JobApplication>(
        `${this.apiUrl}/${this.editingId}`,
        application
      ).subscribe(() => {
        this.loadApplications();
        this.resetForm();
      });
    }
  }

  editApplication(application: JobApplication): void {
    this.editingId = application.id;
    this.company = application.company;
    this.position = application.position;
    this.status = application.status;
  }

  deleteApplication(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(() => this.loadApplications());
  }

  resetForm(): void {
    this.editingId = null;
    this.company = '';
    this.position = '';
    this.status = 'Applied';
  }
}
