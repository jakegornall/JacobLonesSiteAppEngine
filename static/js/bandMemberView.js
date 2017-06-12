var bandMemberView = bandMemberView || {};

$(function() {
    var BMView = Backbone.View.extend({
        tagName : "div",
        className : "band-member",
        template : _.template($("#band-member-template").html()),

        events : {
            "click .remove" : "removeMember",
            "click .edit-member" : "editMode",
            "submit .band-member-edit-form" : "update"
        },

        initialize: function() {
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        removeMember : function() {
            this.model.destroy();
        },

        editMode : function() {
            this.$el.find(".band-member-details").hide();
            this.$el.find(".band-member-edit-form").show();
        },

        update : function(e) {
            e.preventDefault();

            var that = this,
                form = new FormData(this.$el.find(".band-member-edit-form")[0]),
                fileInput = this.$el.find(".member-pic-input")[0],
                file = fileInput.files && fileInput.files[0];

            if( file ) {
                var img = new Image();
        
                img.src = window.URL.createObjectURL( file );
        
                img.onload = function() {
                    var width = img.naturalWidth,
                        height = img.naturalHeight;
        
                    window.URL.revokeObjectURL( img.src );
        
                    if( width == 300 && height == 300 ) {
                        $.ajax({
                            type: "POST",
                            url: "/bioPic",
                            data: form,
                            processData: false,
                            contentType: false,
                            success: function(resp) {
                                if (resp.success) {
                                    var newPicURL = resp.data;
                                } else {
                                    var newPicURL = that.model.get("picURL")
                                }

                                console.log(that.$el.find(".admin"));

                                that.model.save({
                                    firstName: that.$el.find(".firstName").val(),
                                    lastName: that.$el.find(".lastName").val(),
                                    role: that.$el.find(".role").val(),
                                    email: that.$el.find(".email").val(),
                                    admin: that.$el.find(".admin")[0].checked,
                                    picURL: newPicURL
                                });
                                
                                that.$el.find(".band-member-details").show();
                                that.$el.find(".band-member-edit-form").hide();
                            },
                            error: function() {
                                console.log("error sending file");
                            }
                        });
                    } else {
                        that.$el.find(".error-msg").text("Image must be a square. Ex. w:300px h:300px");
                    }
                };
            } else {
                $.ajax({
                    type: "POST",
                    url: "/bioPic",
                    data: form,
                    processData: false,
                    contentType: false,
                    success: function(resp) {
                        if (resp.success) {
                            var newPicURL = resp.data;
                        } else {
                            var newPicURL = that.model.get("picURL")
                        
                            that.model.save({
                                firstName: that.$el.find(".firstName").val(),
                                lastName: that.$el.find(".lastName").val(),
                                role: that.$el.find(".role").val(),
                                email: that.$el.find(".email").val(),
                                admin: that.$el.find(".admin")[0].checked,
                                picURL: newPicURL
                            });
                            
                            that.$el.find(".band-member-details").show();
                            that.$el.find(".band-member-edit-form").hide();
                        }
                    },
                    error: function() {
                        console.log("error sending file");
                    }
                });
            }
        }
    });

    bandMemberView = BMView;
});