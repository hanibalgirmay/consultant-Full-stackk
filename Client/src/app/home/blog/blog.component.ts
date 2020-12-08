import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  blog: any = [];

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.blog = [];
    this.blogService.getBlogs().subscribe((data: {}) => {
      console.log(data);
      this.blog = data;
    });
  }

}
