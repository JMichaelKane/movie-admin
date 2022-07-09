<script setup lang="ts"></script>

<template>
	<div class="panel">
		<PanelHeader />
		<div class="panel-body">
			<router-view />
		</div>
	</div>
</template>

<style>
	.panel {
		height: 100vh;
		background-color: #f6f9f8;
	}
</style>
