<div class="calendar">
    <ul class="calendar-navigation" data-role="navigation-container">
        <li class="calendar-previous-year" data-role="prev-year">&lt;&lt;</li>
        <li class="calendar-previous-month" data-role="prev-month">&lt;</li>
        <li class="calendar-month-year" data-role="month-year-container">
        <span class="month" data-role="mode-month" data-value="{{month.current.value}}">{{_ month.current.label}}</span>
        <span class="year" data-role="mode-year">{{year.current.label}}</span>
        </li>
        <li class="calendar-next-month" data-role="next-month">&gt;</li>
        <li class="calendar-next-year" data-role="next-year">&gt;&gt;</li>
    </ul>

    <ul class="calendar-control" data-role="pannel-container">
        {{#if mode.date}}
        {{#each day.items}}
        <li class="calendar-day calendar-day-{{value}}" data-role="day" data-value="{{value}}">{{_ label}}</li>
        {{/each}}
        {{/if}}
    </ul>

    <div class="calendar-data-container" data-role="data-container">
        {{#if mode.date}}
        {{#each date.items}}
        <ul class="calendar-date-column">
            {{#each this}}
            <li class="calendar-day-{{day}} {{className}}
            {{#unless available}}disabled-date{{/unless}}
            "
            data-role="date" data-value="{{value}}"
            >{{label}}</li>
            {{/each}}
        </ul>
        {{/each}}
        {{/if}}

        {{#if mode.month}}
        {{#each month.items}}
        <ul class="calendar-month-column">
            {{#each this}}
            <li data-role="month" data-value="{{value}}">{{_ label}}</li>
            {{/each}}
        </ul>
        {{/each}}
        {{/if}}

        {{#if mode.year}}
        {{#each year.items}}
        <ul class="calendar-year-column">
            {{#each this}}
            <li data-role="{{role}}" data-value="{{value}}">{{_ label}}</li>
            {{/each}}
        </ul>
        {{/each}}
        {{/if}}
    </div>

    <div class="calendar-footer" data-role="time-container">
      <button class="btn" data-role="today">{{_ message.today}}</button>
      {{#if mode.time}}
      <div class="calendar-time" data-role="time"><span class="calendar-hour">{{time.hour}}</span> : {{time.minute}}</div>
      {{/if}}
    </div>

</div>

