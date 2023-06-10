<template>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          class="custom-menu"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          key-field="whateverKey"
          label-field="whateverLabel"
          children-field="whateverChildren"
          @update:value="handleMenuUpdate"
        />
      </n-layout-sider>
      <span>
        <h1><Footer/></h1>
      </span>
      <n-layout />
    </n-layout>
  </template>
  
  <script setup>
  import Footer from '../components/Footer.vue';
  import { NIcon } from "naive-ui";
  import {
    TimeOutline as TimeIcon,
    PersonOutline as PersonIcon,
    DesktopOutline as DesktopIcon,
    MicOutline as MicIcon
  } from "@vicons/ionicons5";
  import { defineComponent, ref, h } from "vue";
  
  function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
  }
  
  const menuOptions = [
    {
      whateverLabel: "Usuarios",
      whateverKey: "users",
      icon: renderIcon(PersonIcon)
    },
    {
      whateverLabel: "Reservas",
      whateverKey: "reservations",
      icon: renderIcon(TimeIcon),
      disabled: true,
      whateverChildren: [
        {
          whateverLabel: "Rat",
          whateverKey: "rat"
        }
      ]
    },
    {
      whateverLabel: "Salas",
      whateverKey: "rooms",
      disabled: true,
      icon: renderIcon(DesktopIcon)
    },
    {
      whateverLabel: "Equipos",
      whateverKey: "equipments",
      icon: renderIcon(MicIcon),
    }
  ];
  
  const collapsed = ref(true);
  
  function handleMenuUpdate(value) {
    if (value === "equipments") {
      console.log("Equipos selected!");
      // Perform your desired action here



    }
  }
  </script>
  
  <style scoped>
  .custom-menu .n-menu-item {
    color: white;
  }
  </style>
  