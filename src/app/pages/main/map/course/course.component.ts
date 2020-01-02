import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CourseService } from 'src/app/services/api';

@Component({
  selector: 'main-map-course',
  templateUrl: './course.component.pug',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent implements OnInit {
  @Output() select_course = new EventEmitter();
  courses: any = [];

  constructor(
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.courseService.query({})
      .subscribe(
        res => {
          this.courses = res;
        }
      )
  }

  selectCourse(course) {
    this.select_course.emit(course);
  }
}