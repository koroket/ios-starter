
$('.item-selector').on('change',function () {
	_test = $(this);
	console.log($(this).val());
	var key = $(this).val();
	var itemContainer = $(this).parents(".item-container");
	var selectedItem = itemContainer.find('.item[value="'+key+'"]');
	selectedItem.show();
	itemContainer.find('.item').not('[value="'+key+'"]').hide();
})