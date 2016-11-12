Vue.config.devtools = true
new Vue({
	el: '#todoapp',
	data: {
		msg: '',
		items: [],
		completedItems: []
	},
	methods: {
		addItem: function() {
			this.items.unshift(this.msg)
			this.msg = ''
		},
		removeItem: function(item) {
			let index = this.items.indexOf(item)
			this.items.splice(index, 1)
		},
		finishItem: function(item) {
			this.removeItem(item)
			this.completedItems.unshift(item)
		},
		unfinishItem: function(item) {
			this.rmCompletedItem(item)
			this.items.unshift(item)
		},
		rmCompletedItem: function(item) {
			let index = this.items.indexOf(item)
			this.completedItems.splice(index, 1)
		}
	}
})