// var path = "https://blueexpresspackersmovers.com/";
var path = "http://192.168.1.11/eurolinepackers.in/euro/";
function readUrl(input,img){

if(input.files && input.files[0]) {
var reader =new FileReader();
reader.onload = function(e) {
		img.attr('src',e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}


window.Parsley.addValidator('fileSize', {
  validateString: function(_value, size, parsleyInstance) {
    var files = parsleyInstance.$element[0].files;
    sz = ((files[0].size/1024)/1024);
    console.log(sz);
    if(size >= sz) {
        return true;
    } else {
        return false;
    }
  },
  requirementType: 'string',
  messages: {
    en: 'File size should be %s MB only.'
  }
});



  $(document).on("click", ".delrow", function() {
      var tr = $(this).closest('tr');
      var id = $(this).attr('data-row-id');
      var tbl = $(this).attr('data-tbl');

      swal.fire({
        icon:'warning',
        title: 'Are You Sure?',
        text: "You won't to delete the record.",
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        // denyButtonText: `Don't save`,
      }).then((result) => {
        // console.log(result);
        if(result.isConfirmed == true) {
        $.ajax({
          type:"post",
          url: path+'admin/action/delete',
          data:"id="+id+"&tbl="+tbl,
          dataType:"json",
          success:function(res) {
            if(res.status == 1) {
              tr.fadeOut();
              $.notify({
                icon: 'flaticon-alarm-1',
                title: 'Record Deleted',
                message: 'Record Deleted Successfully',
              },{
                type: 'danger',
                placement: {
                  from: "top",
                  align: "right"
                },
                time: 1000,
              });
            }

          }
        })
        }
      })

  });


  $(document).on("click", ".sm-switch", function(){
    btn = $(this).find('.tbtn');
    var pos =  btn.css('left');
    if(pos == '23px') {
      btn.animate({'left': "1px"});
      $(this).css({'background-color':'#ddd'})
    } else {
      btn.animate({'left': "23px"});
      $(this).css({'background-color':'#1cc88a'});
    }
  });

  $(document).on('click', '.sm-switch', function() {
    var tbl = $(this).attr('data-tbl');
    var id = $(this).attr('data-row-id');
    var val = $(this).attr('data-val');

    if(val == 1) {
      $(this).attr('data-val', 0);
    } else {
       $(this).attr('data-val', 1);
    }

    $.ajax({
      type:"post",
      url:path+'admin/action/status',
      data:'tbl='+tbl+'&id='+id+'&val='+val,
      dataType:'json',
      success:function(){
        $.notify({
          icon: 'flaticon-hands',
          title: 'Status Updated',
          message: 'Status Updated Successfully',
        },{
          type: 'success',
          placement: {
            from: "top",
            align: "right"
          },
          time: 1000,
        });
        citywisetable.ajax.reload(null,false);
        
      }
      
    })
  });

  $(document).on("click", ".city-status", function () {

    let btn = $(this);

    let id     = btn.data('id');
    let tbl    = btn.data('table');
    let column = btn.data('column');
    let path   = btn.data('path');

    let currentStatus = btn.data('status');
    let newStatus = currentStatus == 1 ? 0 : 1;

    $.ajax({
        url: path + 'admin/action/citystatus',
        type: 'POST',
        data: {
            id: id,
            tbl: tbl,
            column: column,
            status: newStatus
        },
        dataType: 'json',
        success: function(response) {
            if (response.status === 'success') {
                // update the button’s data-status so next click is correct
                btn.data('status', newStatus);

                $.notify({
                    icon: 'flaticon-hands',
                    title: 'Status Updated',
                    message: response.message,
                },{
                    type: 'success',
                    placement: {
                        from: "top",
                        align: "right"
                    },
                    delay: 2000
                });

                // reload table without resetting pagination
                citywisetable.ajax.reload(null, false);
            } else {
                $.notify({
                    title: 'Error',
                    message: response.message,
                },{
                    type: 'danger'
                });
            }
        },
        error: function(xhr, status, error) {
            console.log("AJAX Error:", error);
            $.notify({
                title: 'Error',
                message: 'Something went wrong',
            },{
                type: 'danger'
            });
        }
    });

});

