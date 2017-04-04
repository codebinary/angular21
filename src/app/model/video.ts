export class Video{
	constructor(
		public id:number,
        public user_id:number,
		public title:string,
		public description:string,
		public status:string,
		public image:string,
		public video_path:string
	){}
}