import { Template } from 'meteor/templating';

import { MangasData } from '../../../api/mangasData/schema.js';

import './tome.jade';

Template.tome.helpers({
	tomeData() {
		let data = MangasData.findOne({
			_id: this.mangaId
		}, {
			fields: {
				'tomes.cover': 1,
				'tomes.title': 1,
				'tomes.tomeId': 1,
				'tomes.number': 1,
				names: 1
			}
		});
		let tome = data.tomes.filter((cur, index, array) => {
			return cur.tomeId === this.tomeId;
		});
		let tomeData = {
			mangaId: this.mangaId,
			tomeId: this.tomeId,
			names: data.names,
			cover: tome[0].cover,
			number: tome[0].number,
			title: tome[0].title || 'Title missing'
		}
		return tomeData;
	}
});
