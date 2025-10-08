<script>
import { h, Transition, TransitionGroup, KeepAlive } from 'vue'
import addMonths from 'date-fns/addMonths'
import startOfMonth from 'date-fns/startOfMonth'
import subMonths from 'date-fns/subMonths'
import getDate from 'date-fns/getDate'
import getDay from 'date-fns/getDay'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'
import isEqual from 'date-fns/isEqual'
import isSameDay from 'date-fns/isSameDay'
import setDate from 'date-fns/setDate'
import setMonth from 'date-fns/setMonth'
import setYear from 'date-fns/setYear'

import MdComponent from '@/core/MdComponent'
import MdPopover from '@/components/MdPopover/MdPopover.vue'
import MdArrowRightIcon from '@/core/icons/MdArrowRightIcon.vue'
import MdArrowLeftIcon from '@/core/icons/MdArrowLeftIcon.vue'
import MdButton from '@/components/MdButton/MdButton.vue'
import MdContent from '@/components/MdContent/MdContent.vue'
import MdDialogActions from '@/components/MdDialog/MdDialogActions.vue'

const daysInAWeek = 7

const getElements = (el, selector) => {
  if (el && el.querySelector) {
    return el.querySelectorAll(selector)
  }

  return false
}

export default MdComponent({
  name: 'MdDatepickerDialog',
  components: {
    MdPopover,
    MdArrowRightIcon,
    MdArrowLeftIcon,
    MdButton,
    MdContent,
    MdDialogActions
  },
  props: {
    mdDate: Date,
    mdDisabledDates: [Array, Function],
    mdImmediately: {
      type: Boolean,
      default: false
    },
    mdPlacement: {
      type: String,
      default: 'bottom-start'
    }
  },
  data: () => ({
    currentDate: null,
    selectedDate: null,
    showDialog: false,
    monthAction: null,
    currentView: 'day',
    contentStyles: {},
    availableYears: null
  }),
  computed: {
    firstDayOfAWeek() {
      // normalize
      let firstDayOfAWeek = Number(this.locale.firstDayOfAWeek)
      if (Number.isNaN(firstDayOfAWeek) || !Number.isFinite(firstDayOfAWeek)) {
        return 0
      }
      firstDayOfAWeek = Math.floor(firstDayOfAWeek) % daysInAWeek
      firstDayOfAWeek += firstDayOfAWeek < 0 ? daysInAWeek : 0
      return firstDayOfAWeek
    },
    filteredShorterDays() {
      const days = this.locale.shorterDays
      const first = this.firstDayOfAWeek
      return [...days.slice(first), ...days.slice(0, first)]
    },
    locale() {
      return this.$material.locale
    },
    popperSettings() {
      return {
        placement: this.mdPlacement,
        modifiers: {
          keepTogether: {
            enabled: true
          },
          flip: {
            enabled: false
          }
        }
      }
    },
    calendarClasses() {
      if (this.monthAction === 'next') {
        return 'md-next'
      }

      return 'md-previous'
    },
    firstDayOfMonth() {
      return startOfMonth(this.currentDate).getDay()
    },
    prefixEmptyDays() {
      let prefixEmptyDays = this.firstDayOfMonth - this.firstDayOfAWeek
      prefixEmptyDays += prefixEmptyDays < 0 ? daysInAWeek : 0
      return prefixEmptyDays
    },
    daysInMonth() {
      return getDaysInMonth(this.currentDate)
    },
    currentDay() {
      if (this.selectedDate) {
        return getDate(this.selectedDate)
      }

      return getDate(this.currentDate)
    },
    currentMonth() {
      return getMonth(this.currentDate)
    },
    currentMonthName() {
      return this.locale.months[this.currentMonth]
    },
    currentYear() {
      return getYear(this.currentDate)
    },
    selectedYear() {
      if (this.selectedDate) {
        return getYear(this.selectedDate)
      }

      return getYear(this.currentDate)
    },
    shortDayName() {
      if (this.selectedDate) {
        return this.locale.shortDays[getDay(this.selectedDate)]
      }

      return this.locale.shortDays[getDay(this.currentDate)]
    },
    shortMonthName() {
      if (this.selectedDate) {
        return this.locale.shortMonths[getMonth(this.selectedDate)]
      }

      return this.locale.shortMonths[getMonth(this.currentDate)]
    }
  },
  watch: {
    mdDate() {
      this.currentDate = this.mdDate || new Date()
      this.selectedDate = this.mdDate
    },
    currentDate(next, previous) {
      this.$nextTick().then(() => {
        if (previous) {
          this.setContentStyles()
        }
      })
    },
    currentView() {
      this.$nextTick().then(() => {
        if (this.currentView === 'year') {
          const activeYear = getElements(this.$el, '.md-datepicker-year-button.md-datepicker-selected')

          if (activeYear.length) {
            activeYear[0].scrollIntoView({
              behavior: 'instant',
              block: 'center',
              inline: 'center'
            })
          }
        }
      })
    }
  },
  methods: {
    setContentStyles() {
      const months = getElements(this.$el, '.md-datepicker-month')

      if (months.length) {
        const nextMonth = months[months.length - 1]

        this.contentStyles = {
          height: nextMonth.offsetHeight + 10 + 'px'
        }
      }
    },
    setAvailableYears() {
      const { startYear, endYear } = this.locale
      let counter = startYear
      let years = []

      while (counter <= endYear) {
        years.push(counter++)
      }

      this.availableYears = years
    },
    handleDisabledDateByArray(date) {
      return this.mdDisabledDates.some(disabledDate => isSameDay(disabledDate, date))
    },
    isDisabled(day) {
      if (this.mdDisabledDates) {
        const targetDate = setDate(this.currentDate, day)

        if (Array.isArray(this.mdDisabledDates)) {
          return this.handleDisabledDateByArray(targetDate)
        } else if (typeof this.mdDisabledDates === 'function') {
          return this.mdDisabledDates(targetDate)
        }
      }
    },
    isSelectedDay(day) {
      return isEqual(this.selectedDate, setDate(this.currentDate, day))
    },
    isToday(day) {
      return isSameDay(new Date(), setDate(this.currentDate, day))
    },
    previousMonth() {
      this.monthAction = 'previous'
      this.currentDate = subMonths(this.currentDate, 1)
    },
    nextMonth() {
      this.monthAction = 'next'
      this.currentDate = addMonths(this.currentDate, 1)
    },
    switchMonth(index) {
      this.currentDate = setMonth(this.currentDate, index)
      this.currentView = 'day'
    },
    switchYear(year) {
      this.currentDate = setYear(this.currentDate, year)
      this.currentView = 'month'
    },
    selectDate(day) {
      this.currentDate = setDate(this.currentDate, day)
      this.selectedDate = this.currentDate

      if (this.mdImmediately) {
        this.$emit('update:mdDate', this.selectedDate)
        this.closeDialog()
      }
    },
    closeDialog() {
      this.$emit('md-closed')
    },
    onClose() {
      this.closeDialog()
    },
    onCancel() {
      this.closeDialog()
    },
    onConfirm() {
      this.$emit('update:mdDate', this.selectedDate)
      this.closeDialog()
    },
    resetDate() {
      this.currentDate = this.mdDate || new Date()
      this.selectedDate = this.mdDate
      this.currentView = 'day'
    }
  },
  created() {
    this.setAvailableYears()
    this.resetDate()
  },
  render() {
    // Helper to create empty day spans
    const createEmptyDays = () => {
      const emptyDays = []
      for (let i = 0; i < this.prefixEmptyDays; i++) {
        emptyDays.push(h('span', {
          class: 'md-datepicker-empty',
          key: `day-empty-${i}`
        }))
      }
      return emptyDays
    }

    // Helper to create day buttons
    const createDayButtons = () => {
      const days = []
      for (let day = 1; day <= this.daysInMonth; day++) {
        days.push(h('div', {
          class: 'md-datepicker-day',
          key: `day-${day}`
        }, [
          h('span', {
            class: [
              'md-datepicker-day-button',
              {
                'md-datepicker-selected': this.isSelectedDay(day),
                'md-datepicker-today': this.isToday(day),
                'md-datepicker-disabled': this.isDisabled(day)
              }
            ],
            onClick: () => this.selectDate(day)
          }, day)
        ]))
      }
      return days
    }

    // Create header
    const header = h('div', { class: 'md-datepicker-header' }, [
      h('span', {
        class: ['md-datepicker-year-select', { 'md-selected': this.currentView === 'year' }],
        onClick: () => { this.currentView = 'year' }
      }, this.selectedYear),
      h('div', {
        class: ['md-datepicker-date-select', { 'md-selected': this.currentView !== 'year' }],
        onClick: () => { this.currentView = 'day' }
      }, [
        h('strong', { class: 'md-datepicker-dayname' }, `${this.shortDayName}, `),
        h('strong', { class: 'md-datepicker-monthname' }, this.shortMonthName),
        h('strong', { class: 'md-datepicker-day' }, this.currentDay)
      ])
    ])

    // Create body header (navigation buttons)
    const bodyHeader = this.currentView === 'day' ? h(Transition, { name: 'md-datepicker-body-header' }, {
      default: () => h('div', { class: 'md-datepicker-body-header' }, [
        h(MdButton, {
          class: 'md-dense md-icon-button',
          onClick: this.previousMonth
        }, {
          default: () => [h(MdArrowLeftIcon)]
        }),
        h(MdButton, {
          class: 'md-dense md-icon-button',
          onClick: this.nextMonth
        }, {
          default: () => [h(MdArrowRightIcon)]
        })
      ])
    }) : null

    // Create calendar view (day view)
    const calendarView = this.currentView === 'day' ? h(TransitionGroup, {
      class: ['md-datepicker-panel', 'md-datepicker-calendar', this.calendarClasses],
      tag: 'div',
      name: 'md-datepicker-month'
    }, {
      default: () => [this.currentDate].map(month => h('div', {
        class: ['md-datepicker-panel', 'md-datepicker-month'],
        key: month.getMonth()
      }, [
        h(MdButton, {
          class: 'md-dense md-datepicker-month-trigger',
          onClick: () => { this.currentView = 'month' }
        }, {
          default: () => `${this.currentMonthName} ${this.currentYear}`
        }),
        h('div', { class: 'md-datepicker-week' },
          this.filteredShorterDays.map((day, index) => h('span', { key: index }, day))
        ),
        h('div', { class: 'md-datepicker-days' }, [
          ...createEmptyDays(),
          ...createDayButtons()
        ])
      ]))
    }) : null

    // Create month selector view
    const monthSelectorView = this.currentView === 'month' ? h('div', {
      class: ['md-datepicker-panel', 'md-datepicker-month-selector']
    }, [
      h(MdButton, {
        class: 'md-datepicker-year-trigger',
        onClick: () => { this.currentView = 'year' }
      }, {
        default: () => this.currentYear
      }),
      ...this.locale.months.map((month, index) => h('span', {
        class: [
          'md-datepicker-month-button',
          { 'md-datepicker-selected': this.currentMonthName === month }
        ],
        key: month,
        onClick: () => this.switchMonth(index)
      }, month))
    ]) : null

    // Create year selector view
    const yearSelectorView = this.currentView === 'year' ? h(KeepAlive, {}, {
      default: () => h(MdContent, {
        class: 'md-datepicker-panel md-datepicker-year-selector md-scrollbar'
      }, {
        default: () => this.availableYears.map(year => h('span', {
          class: [
            'md-datepicker-year-button',
            { 'md-datepicker-selected': this.currentYear === year }
          ],
          key: year,
          onClick: () => this.switchYear(year)
        }, year))
      })
    }) : null

    // Create view content with transition
    const viewContent = h(Transition, { name: 'md-datepicker-view' }, {
      default: () => calendarView || monthSelectorView || yearSelectorView
    })

    // Create body content
    const bodyContent = h('div', {
      class: 'md-datepicker-body-content',
      style: this.contentStyles
    }, [viewContent])

    // Create footer
    const footer = h(MdDialogActions, { class: 'md-datepicker-body-footer' }, {
      default: () => [
        h(MdButton, {
          class: 'md-primary',
          onClick: this.onCancel
        }, {
          default: () => this.locale.cancel
        }),
        !this.mdImmediately ? h(MdButton, {
          class: 'md-primary',
          onClick: this.onConfirm
        }, {
          default: () => this.locale.confirm
        }) : null
      ].filter(Boolean)
    })

    // Create body
    const body = h('div', { class: 'md-datepicker-body' }, [
      bodyHeader,
      bodyContent,
      footer
    ])

    // Create dialog content
    const dialogContent = h('div', {
      tabindex: -1,
      class: ['md-datepicker-dialog', this.$mdActiveTheme]
    }, [header, body])

    // Create transition
    const transition = h(Transition, {
      name: 'md-datepicker-dialog',
      appear: true,
      onEnter: this.setContentStyles,
      onAfterLeave: this.resetDate
    }, {
      default: () => dialogContent
    })

    // Wrap in MdPopover
    return h(MdPopover, {
      mdSettings: this.popperSettings,
      mdActive: true
    }, {
      default: () => transition
    })
  }
})
</script>

<style lang="scss">
  @import "@/components/MdAnimation/variables.scss";
  @import "@/components/MdLayout/mixins.scss";
  @import "@/components/MdElevation/mixins.scss";

  $md-calendar-width: 320px;
  $md-calendar-mobile-width: 296px;

  .md-datepicker-dialog {
    @include md-elevation(24);
    display: flex;
    overflow: hidden;
    z-index: 110;
    border-radius: 2px;
    backface-visibility: hidden;
    pointer-events: auto;
    transform-origin: top left;
    flex-shrink: 0;
    transition: opacity .2s $md-transition-stand-timing,
                transform .35s $md-transition-stand-timing;
    will-change: opacity, transform, left, top;

    @include md-layout-xsmall {
      flex-direction: column;
      top: 50% !important;
      left: 50% !important;
      transform: translate3D(-50%, -50%, 0);
      transform-origin: center center;
      position: fixed !important;
    }
  }

  .md-datepicker-dialog-leave-active {
    opacity: 0;
  }

  .md-datepicker-dialog-enter {
    opacity: 0;
    transform: scale(.9);

    @include md-layout-xsmall {
      transform: translate3D(-50%, -50%, 0) scale(.9);
    }

    .md-datepicker-body {
      .md-datepicker-calendar {
        opacity: 0;
        transform: translate3D(0, 10%, 0);
      }
    }
  }

  .md-datepicker-header {
    min-width: 150px;
    padding: 16px;

    @include md-layout-xsmall {
      min-width: auto;
      padding: 16px 20px;
    }

    .md-datepicker-year-select {
      cursor: pointer;
      opacity: .54;
      transition: opacity .3s $md-transition-default-timing;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: .01em;
      line-height: 24px;
    }

    .md-datepicker-date-select {
      cursor: pointer;
      opacity: .54;
      transition: opacity .3s $md-transition-default-timing;
      font-size: 32px;
      font-weight: 900;
      letter-spacing: 0;
      line-height: 1.2em;
    }

    .md-datepicker-dayname {
      display: block;

      @include md-layout-xsmall {
        display: inline-block;
      }
    }

    .md-selected {
      opacity: 1;
    }
  }

  .md-datepicker-body {
    width: $md-calendar-width;
    position: relative;
    overflow: hidden;
    transition: width .3s $md-transition-stand-timing;
    will-change: width;

    @include md-layout-xsmall {
      width: $md-calendar-mobile-width;
    }

    .md-button {
      margin: 0;
    }
  }

  .md-datepicker-body-header {
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    pointer-events: none;

    &:before,
    &:after {
      width: 48px;
      height: 48px;
      position: absolute;
      top: 0;
      z-index: 2;
      pointer-events: none;
      content: " ";
    }

    &:after {
      left: 0;
    }

    &:before {
      right: 0;
    }

    .md-button {
      pointer-events: auto;
      z-index: 3;
    }
  }

  .md-datepicker-body-header-enter,
  .md-datepicker-body-header-leave-active {
    .md-button:first-child {
      transform: translate3d(-150%, 0, 0);
    }

    .md-button:last-child {
      transform: translate3d(150%, 0, 0);
    }
  }

  .md-datepicker-body-content {
    overflow: hidden;
    transition: height .35s $md-transition-default-timing;
    will-change: height;
  }

  .md-datepicker-panel {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: .35s $md-transition-default-timing;
    transition-property: transform, opacity;
    will-change: transform, opacity;
  }

  .md-datepicker-calendar {
    &.md-datepicker-view-enter,
    &.md-datepicker-view-leave-active {
      transform: translate3d(0, 100%, 0);
    }

    &.md-previous {
      .md-datepicker-month-enter {
        transform: translate3D(-100%, 0, 0);

        .md-datepicker-month-trigger {
          transform: translate3D(-30%, 0, 0);
        }
      }

      .md-datepicker-month-leave-active {
        transform: translate3D(100%, 0, 0);
      }
    }

    &.md-next {
      .md-datepicker-month-enter {
        transform: translate3D(100%, 0, 0);

        .md-datepicker-month-trigger {
          transform: translate3D(30%, 0, 0);
        }
      }

      .md-datepicker-month-leave-active {
        transform: translate3D(-100%, 0, 0);
      }
    }
  }

  .md-datepicker-month {
    top: 8px;
    bottom: auto;
    flex-direction: column;
    transition: .35s $md-transition-default-timing;
    transition-property: transform, opacity;
    will-change: transform, opacity;

    @include md-layout-xsmall {
      padding: 0 6px;
    }

    .md-datepicker-month-trigger {
      min-height: 32px;
      margin: 0 46px 10px;
      flex: 1;
      border-radius: 0;
      transition: transform .45s $md-transition-default-timing;
      will-change: transform;
    }
  }

  .md-datepicker-week {
    display: flex;
    align-items: center;

    span {
      flex: 1;
      font-size: 12px;
      text-align: center;
    }
  }

  .md-datepicker-days {
    $md-day-width: 100%;

    display: flex;
    flex-wrap: wrap;

    .md-datepicker-empty,
    .md-datepicker-day {
      margin: 1px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 1 $md-day-width / 7;
    }

    .md-datepicker-day-button {
      $width: 30px;

      width: $width;
      min-width: $width;
      height: $width;
      cursor: pointer;
      border-radius: $width;
      transition: .3s $md-transition-default-timing;
      line-height: $width;
      text-align: center;
    }

    .md-datepicker-selected {
      font-weight: 700;
    }

    .md-datepicker-today {
      font-weight: 700;
    }

    .md-datepicker-disabled {
      pointer-events: none;
    }
  }

  .md-datepicker-month-selector {
    padding: 6px 8px 10px;
    flex-wrap: wrap;
    bottom: auto;
    transition: .35s $md-transition-default-timing;
    transition-property: transform, opacity;
    will-change: transform, opacity;

    &.md-datepicker-view-enter,
    &.md-datepicker-view-leave-active {
      transform: translate3d(0, -100%, 0);
    }

    .md-datepicker-year-trigger {
      width: 100%;
      margin: 0 0 8px;
      flex: 1 1 100%;
    }
  }

  .md-datepicker-month-button,
  .md-datepicker-year-button {
    height: 36px;
    margin: 3px 0;
    cursor: pointer;
    transition: .3s $md-transition-default-timing;
    line-height: 36px;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
  }

  .md-datepicker-month-button {
    flex: 1 1 33.3333%;
    border-radius: 2px;
    font-size: 13px;
  }

  .md-datepicker-year-selector {
    flex-direction: column;
    overflow: auto;
    bottom: 52px;
    border-bottom: 1px solid;

    &.md-datepicker-view-enter,
    &.md-datepicker-view-leave-active {
      transform: translate3d(0, -100%, 0);
    }

    .md-button {
      min-height: 36px;
    }
  }

  .md-datepicker-year-button {
    font-size: 16px;

    &.md-datepicker-selected {
      font-size: 24px;
    }
  }
</style>
