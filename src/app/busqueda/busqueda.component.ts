import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface City {
  name: string,
  id: string
}

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  cities: City[];
  selectedCity: City;
  constructor(private http: HttpClient) { 

  }

  ngOnInit(): void {
this.http.get("/api/countries").subscribe((data:any)=>{
  this.cities=data.data;
 })
//[{"id":"Q889","search_uri":"http://www.wikidata.org/entity/Q889","icon_svg_uri":"http://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20the%20Taliban.svg","name":"Afganistán"},
 //   this.selectedCity =  {name: 'New York', code: 'NY'};
  //  this.cities = [
  //    {name: 'New York', code: 'NY'},
  //    {name: 'Rome', code: 'RM'},
  //    {name: 'London', code: 'LDN'},
   //   {name: 'Istanbul', code: 'IST'},
  //    {name: 'Paris', code: 'PRS'}
  //];
  }

}
