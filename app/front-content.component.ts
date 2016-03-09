import {Component, OnInit} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {FrontContentService} from './front-content.service';

@Component({
	selector: 'front-content',
	templateUrl: 'app/front-content.component.html',
	styleUrls: ['app/front-content.component.css'],
	providers: [FrontContentService]


})

export class FrontContentComponent{
	public images = [
	];

	public curIndex: number;
	public opacity: number;
	private _imagesLength: number

	public transSub;

	public errorMessage: string;

	transition(index: number){

			this.images[index].opacity = 100;
			this.images[this.curIndex].opacity = 0;

			this.curIndex = index;

			//reset subscription because think about it..
			//if we were to select a radio button the interval should reset to 2000
			//not stay at 2000 - x, x >= 0

			this.resetSubscription();

	}

	/*This method subscribes our transition subscription variable (transSub)
	 *to changing at every interval
	 */
	autoSubscribe(){
		this.transSub = Observable.interval(2000).subscribe(() => {
			let temp = this.curIndex;

			this.curIndex = (this.curIndex + 1) % this._imagesLength;

			this.images[this.curIndex].opacity = 100;
			this.images[temp].opacity = 0;
		});
	}

	resetSubscription(){
			this.transSub.unsubscribe();
			this.autoSubscribe();

	}

	getImages(){

		this._frontContentService.getImages()
		.subscribe(images => {
				this._imagesLength = images.length;
				for(var i = 0; i < images.length; i++)
				{
					console.log(images[i]);
					this.images[i] = {}
					this.images[i].picture = images[i];
					this.images[i].opacity = 0;
				}
				this.images[0].opacity = 100;
				this.curIndex = 0;

				this.autoSubscribe();
			},

			error => this.errorMessage = <any>error
		);

	}

	constructor (private _frontContentService: FrontContentService) {}

	ngOnInit(){
		this.getImages();

	}

}
