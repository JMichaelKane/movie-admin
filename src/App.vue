<script setup lang="ts"></script>

<template>
	<n-scrollbar style="max-height: 100vh">
		<n-notification-provider>
		<!-- 通知 -->
			<n-dialog-provider>
			<!-- 对话框 -->
				<n-message-provider>
				<!-- 信息 -->
					<router-view />
				</n-message-provider>
			</n-dialog-provider>
		</n-notification-provider>
	</n-scrollbar>
</template>

<style>
	body {
		margin: 0;
	}
	.user-drag {
		-webkit-user-drag: none;
	}
	a {
		text-decoration: none; /* 去除默认的下划线 */
		outline: none; /* 去除旧版浏览器的点击后的外虚线框 */
		color: #000; /* 去除默认的颜色和点击后变化的颜色 */
	}
	.relative {
		position: relative;
	}
	.absolute {
		position: absolute;
	}
	.flex {
		display: flex;
	}
	.justify-between {
		justify-content: space-between;
	}
	.border-box {
		box-sizing: border-box;
	}
</style>
