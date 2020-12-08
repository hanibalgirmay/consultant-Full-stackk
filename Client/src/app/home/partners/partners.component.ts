import { Component, OnInit } from '@angular/core';
import { PartnerService } from '../../services/partner.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css'],
  providers: [PartnerService]
})
export class PartnersComponent implements OnInit {

  partners: any = [];
  data: any = [];
	// partner: Partner;
	name: string;
	description: string;
	partnerImage: string;

  constructor(private partnerService: PartnerService, private router:Router) { }

  ngOnInit() {
  	this.getPartners();
  }

  public view(id){
    console.log(id);
    this.partnerService.getPartnerById(id)
    .subscribe((res :{}) => {
      this.data = res;
      const modal = `data-toggle="modal" data-target="#view" `
    })
  }

   getPartners() {
    this.partners = [];
    this.partnerService.getPartners().subscribe((data: {}) => {
      console.log(data);
      this.partners = data;
    });
  }

  public link(uri){
    let url: string ;
    this.router.navigate([url]);
  }

  delete(id) {
    this.partnerService.deletePartner(id)
      .subscribe(res => {
          this.getPartners();
        }, (err) => {
          console.log(err);
        }
      );
  }


}
