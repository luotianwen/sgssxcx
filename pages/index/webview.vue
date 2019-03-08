<template>
    <view>
        <web-view :webview-styles="webviewStyles"  :src="url" ></web-view>
    </view>
</template>

<script>
    export default {
		
        data() {
            return {
				url:"",
				
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        },
		
		onLoad(d) {
			wx.showShareMenu({
			  withShareTicket: true
			});
			let _name=decodeURIComponent(d.name);
			let _url=decodeURIComponent(d.url);
			console.log(_url);
			this.url=_url;
			  uni.setNavigationBarTitle({
				title: _name
			})  
		}
		
    }
</script>

<style>

</style>