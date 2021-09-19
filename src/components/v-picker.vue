<template>
  <div v-click-outside="handlerHidePicker" class="v-picker__wrapper">
    <div class="v-picker__control">
      <label
          v-if="Boolean(title)"
          class="v-picker__title"
          :class="{ 'v-picker__title--transform': Boolean(inputValue) }"
      >
        {{ title }}
      </label>
      <input
          ref="input"
          type="text"
          class="v-picker__field"
          readonly
          :value="!date ? '' : inputValue"
          @input="handlerInput"
          @keyup.enter="handleChangeInput"
          @blur="handleChangeInput"
          @focus="navigationFocus"
          @keyup.down="handlerKeyDown"
          @keyup.up="handlerKeyUp"
      />
    </div>
    <section v-if="focus" ref="picker" class="v-picker">
      <div class="v-picker__navigation">
        <svg @click="handlerPrevYear" width="16px" height="16px" viewBox="0 0 16 16" fill="#3d75e4"
             xmlns="http://www.w3.org/2000/svg" class="v-picker__navigation-prev-year">
          <g clip-path="url(#clip0)" fill="#3d75e4">
            <path
                d="M9.88441 0.356486C9.52905 -0.0662833 8.89825 -0.120926 8.47548 0.234439C8.05271 0.589804 7.99806 1.22061 8.35343 1.64338L13.6965 7.99993L8.35343 14.3565C7.99806 14.7793 8.0527 15.4101 8.47547 15.7654C8.89824 16.1208 9.52905 16.0661 9.88441 15.6434L15.7684 8.64338C16.081 8.27139 16.081 7.72847 15.7684 7.35649L9.88441 0.356486Z"
                fill="#3d75e4"></path>
            <path
                d="M1.76527 0.356487C1.40991 -0.0662833 0.779106 -0.120926 0.356336 0.234439C-0.0664335 0.589803 -0.121076 1.22061 0.234289 1.64338L5.57737 7.99993L0.234286 14.3565C-0.121078 14.7793 -0.0664361 15.4101 0.356334 15.7654C0.779104 16.1208 1.40991 16.0661 1.76527 15.6434L7.64921 8.64338C7.96189 8.27139 7.96189 7.72847 7.64922 7.35649L1.76527 0.356487Z"
                fill="#3d75e4"></path>
          </g>
          <defs fill="#3d75e4">
            <clipPath id="clip0" fill="#3d75e4">
              <rect width="16" height="16" fill="#3d75e4" transform="translate(16 16) rotate(-180)"></rect>
            </clipPath>
          </defs>
        </svg>
        <svg @click="handlerPrevMonth" width="16px" height="16px" viewBox="0 0 6 16" fill="#3d75e4"
             xmlns="http://www.w3.org/2000/svg" class="v-picker__navigation-prev-month">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M3.92388 0.819363C4.18933 0.369219 4.77235 0.224264 5.2177 0.497682C5.65199 0.764307 5.79256 1.32973 5.53371 1.76869L2.15861 7.49204C1.97379 7.80546 1.97379 8.19454 2.15861 8.50796L5.53371 14.2313C5.79256 14.6703 5.65199 15.2357 5.2177 15.5023C4.77235 15.7757 4.18933 15.6308 3.92388 15.1806L0.266126 8.97797C-0.0887088 8.37625 -0.0887087 7.62375 0.266126 7.02203L3.92388 0.819363Z"
                fill="#3d75e4"></path>
        </svg>
        <div class="v-picker__navigation-date">
            <span class="v-picker__navigation-month">
              {{ currentMonthName }}
            </span>
          <span class="v-picker__navigation-year">
              {{ rootValue.getFullYear() }}
            </span>
        </div>
        <svg @click="handlerNextMonth" width="16px" height="16px" viewBox="0 0 6 16" fill="#3d75e4"
             xmlns="http://www.w3.org/2000/svg" class="v-picker__navigation-next-month">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M2.07612 15.1806C1.81067 15.6308 1.22765 15.7757 0.782301 15.5023C0.348015 15.2357 0.207436 14.6703 0.466293 14.2313L3.84139 8.50796C4.02622 8.19454 4.02622 7.80546 3.84139 7.49204L0.466293 1.76869C0.207436 1.32973 0.348015 0.764307 0.7823 0.497682C1.22765 0.224264 1.81067 0.369218 2.07612 0.819362L5.73387 7.02203C6.08871 7.62375 6.08871 8.37625 5.73387 8.97797L2.07612 15.1806Z"
                fill="#3d75e4"></path>
        </svg>
        <svg @click="handlerNextYear" width="16px" height="16px" viewBox="0 0 16 16" fill="#3d75e4"
             xmlns="http://www.w3.org/2000/svg" class="v-picker__navigation-next-year">
          <g clip-path="url(#clip0)" fill="#3d75e4">
            <path
                d="M9.88441 0.356486C9.52905 -0.0662833 8.89825 -0.120926 8.47548 0.234439C8.05271 0.589804 7.99806 1.22061 8.35343 1.64338L13.6965 7.99993L8.35343 14.3565C7.99806 14.7793 8.0527 15.4101 8.47547 15.7654C8.89824 16.1208 9.52905 16.0661 9.88441 15.6434L15.7684 8.64338C16.081 8.27139 16.081 7.72847 15.7684 7.35649L9.88441 0.356486Z"
                fill="#3d75e4"></path>
            <path
                d="M1.76527 0.356487C1.40991 -0.0662833 0.779106 -0.120926 0.356336 0.234439C-0.0664335 0.589803 -0.121076 1.22061 0.234289 1.64338L5.57737 7.99993L0.234286 14.3565C-0.121078 14.7793 -0.0664361 15.4101 0.356334 15.7654C0.779104 16.1208 1.40991 16.0661 1.76527 15.6434L7.64921 8.64338C7.96189 8.27139 7.96189 7.72847 7.64922 7.35649L1.76527 0.356487Z"
                fill="#3d75e4"></path>
          </g>
          <defs fill="#3d75e4">
            <clipPath id="clip0" fill="#3d75e4">
              <rect width="16" height="16" fill="#3d75e4" transform="translate(16 16) rotate(-180)"></rect>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="v-picker__weekdays">
        <div
            v-for="(wd, index) in weekDays"
            :key="`wd-${index}`"
            class="v-picker__weekday"
            :class="{ 'v-picker__weekend': index === 5 || index === 6 }"
        >
          <span>{{ wd }}</span>
        </div>
      </div>
      <div class="v-picker-month__list">
        <div
            v-for="d in paddingStartDays"
            :key="`day-prev-${d}`"
            :class="{ range: isDateInRange(d) }"
            class="v-picker-month__day day-prev-month"
        >
          <div class="v-picker-month__title">
            <span @click="handleSelectDate(d)">{{ d.getDate() }}</span>
          </div>
        </div>
        <div
            v-for="(d, index) in daysInMonthList"
            :key="d.getTime()"
            class="v-picker-month__day day-now-month"
            :class="{ range: isDateInRange(d) }"
            @mousemove="handlerMousemove(d)"
            @keydown.down="handlerKeyDown(index, d)"
            @keydown.up="handlerKeyUp(index, d)"
            @keydown.right="handlerKeyRight(index, d)"
            @keydown.left="handlerKeyLeft(index, d)"
        >
          <div class="v-picker-month__title">
            <span
                :ref="setItemRef"
                tabindex="0"
                :data-index="d.getDate()"
                :class="{
                now: isNow(d.getDate()),
                selected: isSelectedMonth(d),
                'rage-mark': isDateRangeStartAndEnd(d),
              }"
                @click="handleDateClick(d)"
            >
              {{ d.getDate() }}
            </span>
          </div>
        </div>
        <div
            v-for="d in paddingFinishDays"
            :key="`day-next-${d}`"
            class="v-picker-month__day day-next-month"
            :class="{ range: isDateInRange(d) }"
            @mousemove="handlerMousemove(d)"
        >
          <div class="v-picker-month__title">
            <span :class="{ 'rage-mark': isDateRangeStartAndEnd(d) }" @click="handleDateClick(d)">
              {{ d.getDate() }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {
  getMonth,
  isLeapYear,
  getYear,
  paddingFirstDayInMonth,
  isNow,
  getDaysInMonth,
  getDateWithFormat,
  mapOfDate,
  subtractDays,
  addDays,
  getDatesBetweenToDates,
  getStringDate,
  getDate,
  DateType,
  DateMaskFormat,
  FormatType,
  MONTH_DAY_LEAP,
  MONTH_DAY,
  SHORT_WEEK_DAYS,
  MONTHS,
  addYears,
  subtractYears,
  addMonth,
  subtractMonth,
} from "~/utils";
import {Component, PropType} from "vue";
import {getLocale, Locale, LocateObj} from "~/utils/locales";

interface Data {
  weekDays: string[];
  focus: boolean;
  itemRefs: HTMLElement[];
  shadowDate: Date;
  disabledRange: boolean;
  rangeDates: DateType[];
}

export default {
  name: "DPicker",
  props: {
    date: {
      type: [String, Number, Date] as PropType<DateType>,
      required: true,
    },
    format: {
      type: String as PropType<DateMaskFormat>,
      default: "YYYY-MM-DD",
      validator: (v: DateMaskFormat) => ["YYYY-MM-DD", "YYYY-DD-MM"].includes(v),
    },
    returnFormat: {
      type: String as PropType<FormatType>,
      default: "date",
      validator: (v: FormatType) => ["unix", "date", "format"].includes(v),
    },
    title: {type: String as PropType<string>, default: ""},
    closeOutside: {type: Boolean as PropType<boolean>, default: true},
    range: {type: Boolean as PropType<boolean>, default: false},
    locale: {type: String as PropType<Locale>, default: 'en'},
  },
  emits: {
    "update:date": null,
  },
  data(): Data {
    return {
      weekDays: getLocale(this.locale).SHORT_WEEK_DAYS,
      focus: false,
      itemRefs: [],
      shadowDate: this.rootValue,
      disabledRange: true,
      rangeDates: [],
    };
  },
  computed: {
    refsControls(): HTMLElement[] {
      return this.itemRefs;
    },
    rootValue(): Date {
      return new Date(this.date || Date.now());
    },
    rangeInputValue(): string {
      const start = this.rangeDates?.[0]
          ? getDateWithFormat(this.rangeDates?.[0], this.format)
          : "";
      const end = this.rangeDates?.[1] ? getDateWithFormat(this.rangeDates?.[1], this.format) : "";
      return start || end ? `${start || ""} ~ ${end || ""}` : "";
    },
    inputValue(): string {
      if (this.range) return this.rangeInputValue;
      return getDateWithFormat(this.rootValue, this.format);
    },
    localeNames(): LocateObj {
      return getLocale(this.locale)
    },
    currentMonthName(): string {
      const index = this.rootValue.getMonth();
      return this.localeNames.MONTHS[index];
    },
    daysInMonthList(): Date[] {
      const date = new Date(this.rootValue);
      return getDaysInMonth(date.getMonth(), date.getFullYear());
    },
    daysInMonth(): number {
      return this.daysList[getMonth(this.rootValue)];
    },
    daysInPrevMonth(): number {
      return this.daysList[getMonth(this.rootValue) === 0 ? 11 : getMonth(this.rootValue) - 1];
    },
    daysList(): number[] {
      const isLeap = isLeapYear(getYear(this.rootValue));
      return isLeap ? MONTH_DAY_LEAP : MONTH_DAY;
    },
    paddingStartDays(): Date[] {
      const total = paddingFirstDayInMonth(getYear(this.rootValue), getMonth(this.rootValue));
      const date = subtractDays(this.daysInMonthList[0]?.getTime(), total);
      return getDatesBetweenToDates(date, this.daysInMonthList[0]?.getTime());
    },
    paddingFinishDays(): Date[] {
      const total = 42 - (this.paddingStartDays.length + this.daysInMonth);
      const date = addDays(
          this.daysInMonthList[this.daysInMonthList.length - 1]?.getTime(),
          total + 1,
      );
      const startDate = new Date(
          addDays(this.daysInMonthList[this.daysInMonthList.length - 1], 1),
      ).getTime();
      return getDatesBetweenToDates(startDate, date);
    },
    countGrid(): number {
      return this.paddingStartDays.length + this.daysInMonth + this.paddingFinishDays.length;
    },
  },
  watch: {
    rootValue: {
      handler(value: Date) {
        this.shadowDate = value;
      },
      immediate: true,
    },
  },
  mounted(): void {
    document.addEventListener("keydown", this.documentKeydownCb);
  },
  beforeUnmount(): void {
    document.removeEventListener("keydown", this.documentKeydownCb);
  },
  errorCaptured(err: Error, instance: Component, info: string): void {
    console.warn({message: err?.message || "[Error]", locale: instance, info});
  },
  beforeUpdate(): void {
    this.itemRefs = [];
  },
  methods: {
    setItemRef(el: HTMLElement) {
      if (el) {
        this.itemRefs.push(el);
      }
    },
    documentKeydownCb(event: KeyboardEvent): void {
      if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
      }
    },
    async handlerKeyDown(index: number | Event, date: Date): Promise<void> {
      let length = this.refsControls.length;
      let id = typeof index !== "number" ? 0 : index + 7;
      this.handleSelectDate(addDays(date.getTime(), 7));
      if (id < length) {
        return this.refsControls[id].focus();
      }
      await this.navigationFocus();
    },
    async handlerKeyUp(index: number | Event, date: Date): Promise<void> {
      let length = this.refsControls.length;
      let id = typeof index !== "number" ? 0 : index - 7;
      this.handleSelectDate(subtractDays(date.getTime(), 7));
      const total = length - id;
      if (total <= length) {
        return this.refsControls[id].focus();
      }
      await this.navigationFocus();
    },
    async handlerKeyRight(index: number | Event, date: Date): Promise<void> {
      let length = this.refsControls.length;
      let id = typeof index !== "number" ? 0 : index + 1;
      this.handleSelectDate(addDays(date.getTime(), 1));
      if (id < length) {
        return this.refsControls[id].focus();
      }
      await this.navigationFocus();
    },
    async handlerKeyLeft(index: number | Event, date: Date): Promise<void> {
      let id = typeof index !== "number" ? 0 : index - 1;
      this.handleSelectDate(subtractDays(date.getTime(), 1));
      if (id >= 0) {
        return this.refsControls[id].focus();
      }
      await this.navigationFocus();
    },
    handlerMousemove(d: Date): void {
      if (!this.disabledRange && this.rangeDates?.[0]?.getTime() !== d.getTime()) {
        this.rangeDates[1] = d;
      }
    },
    handlerNextYear(): void {
      this.handleSelectDate(addYears(this.rootValue, 1));
    },
    handlerPrevYear(): void {
      this.handleSelectDate(subtractYears(this.rootValue, 1));
    },
    handlerNextMonth(): void {
      this.handleSelectDate(addMonth(this.rootValue, 1));
    },
    handlerPrevMonth(): void {
      this.handleSelectDate(subtractMonth(this.rootValue, 1));
    },
    handlerInput(event: InputEvent): void {
      event.preventDefault();
    },
    handlerHidePicker(): void {
      if (!this.closeOutside) return;
      this.focus = false;
    },
    handleChangeInput(event: KeyboardEvent): void {
      const value = (event.target as HTMLInputElement).value;
      this.handleSelectDate(value);
    },
    async navigationFocus(): Promise<void> {
      this.focus = false;
      await this.$nextTick();
      await this.onFocus();
    },
    async onFocus(): Promise<void> {
      this.focus = true;
      this.$refs.input.focus();
      await this.$nextTick();
      const startDate = getDate(this.rootValue);
      await this.$nextTick();
      this.itemRefs[startDate - 1]?.focus();
    },

    handleDateClick(d: DateType): void {
      if (this.range) {
        this.resetRangeDates();
        this.disabledRange = false;
        if (!this.rangeDates.length) {
          this.rangeDates.push(d);
        }
        if (this.rangeDates.length === 2) {
          this.disabledRange = true;
        }
      }
      this.handleSelectDate(d);
    },
    handleSelectDate(d: DateType): void {
      const key: FormatType = this.returnFormat;
      if (!d) {
        this.$emit("update:date", d);
        return;
      }
      const result = mapOfDate(d, this.format)[key];
      this.$emit("update:date", result);
    },
    resetRangeDates(): void {
      if (this.rangeDates.length === 2 && this.disabledRange) {
        this.rangeDates = [];
      }
    },
    isNow(d: number): boolean {
      return isNow(d, this.rootValue) && !this.rangeDates.length;
    },
    isDateRangeStartAndEnd(d: Date): boolean {
      if (this.rangeDates.length === 2) {
        const item = d.getTime();
        const start = this.rangeDates[0].getTime();
        const end = this.rangeDates[1].getTime();
        return item === start || item === end;
      }
      return false;
    },
    isDateInRange(d: Date): boolean {
      if (this.rangeDates.length === 2) {
        const item = d.getTime();
        const start = this.rangeDates[0].getTime();
        const end = this.rangeDates[1].getTime();
        return item >= start && item <= end;
      }
      return false;
    },
    isSelectedMonth(d: Date): boolean {
      return getStringDate(this.rootValue) === getStringDate(d) && !this.rangeDates.length;
    },
  },
};
</script>
