import { supabase } from './supabase';
import { BehaviorSubject } from 'rxjs';

export class RealtimeService {
  private static instance: RealtimeService;
  private metrics$ = new BehaviorSubject<any>(null);
  private users$ = new BehaviorSubject<any>(null);

  private constructor() {
    this.initializeSubscriptions();
  }

  private initializeSubscriptions() {
    // Subscribe to metrics changes
    supabase
      .channel('metrics')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'metrics'
      }, payload => {
        this.metrics$.next(payload.new);
      })
      .subscribe();

    // Subscribe to user changes
    supabase
      .channel('users')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_profiles'
      }, payload => {
        this.users$.next(payload.new);
      })
      .subscribe();
  }

  public static getInstance(): RealtimeService {
    if (!RealtimeService.instance) {
      RealtimeService.instance = new RealtimeService();
    }
    return RealtimeService.instance;
  }

  public getMetricsStream() {
    return this.metrics$.asObservable();
  }

  public getUsersStream() {
    return this.users$.asObservable();
  }
} 