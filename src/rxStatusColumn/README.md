[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

# Directives 
This component provides directives and styles for putting status columns into tables.

## rx-status-header

For the `<th>` component representing the status column, add the `rx-status-header` attribute, i.e.

    <th rx-status-header></th>

## rx-status-column

For the corresponding `<td>`, you will need to add the `rx-status-column` attribute, and set the `status` attribute appropriately. You can optionally set `api` and `tooltip-content` attributes. `tooltip-content` sets the tooltip that will be used. If not set, it will default to the value you passed in for `status`. The `api` attribute will be explained below.

We currently support four statuses, with corresponding CSS styles. Namely, `"ACTIVE"`, `"WARNING"`, `"ERROR"` and `"INFO"`. If your code happens to already use those statuses, then you can simply pass them to the `status` attribute as appropriate. However, it's likely that internally you will be receiving a number of different statuses from your APIs, and will need to map them to these four statuses.

The example in the demo shows a typical use of this directive, such as:

    <tbody>
        <tr ng-repeat="server in servers">
            <!-- Both `api` and `tooltip-content` are optional -->
            <td rx-status-column status="{{ server.status }}" api="{{ server.api }}" tooltip-content="{{ server.status }}"></td>
            <td>{{ server.title }}</td>
            <td>{{ server.value }}</td>
        </tr>
    </tbody>


# Defining mappings

To accommodate different statuses, the `rxStatusMappings` factory includes methods for defining mappings from your own statuses to the four defined ones. The basic methods for this are `rxStatusMappings.addGlobal()` and `rxStatusMappings.addAPI()`.

## addGlobal()

`rxStatusMappings.addGlobal()` takes an object as an argument, with the keys being your own product's statuses, and the values being one of the four internal statuses that it should map to. For example:

    rxStatusMappings.addGlobal({
        'RUNNING': 'ACTIVE',
        'STANDBY': 'INFO',
        'REBOOTING': 'WARNING',
        'FAILURE': 'ERROR'
    })

These mappings will be used throughout all instances of `rx-status-column` in your code. 

## addAPI()

Say that you are using three APIs in your product, `X`, `Y` and `Z`. Both `X` and `Y` define a status `"FOO"`, which you want to map to encore-ui's `"WARNING"`. You can declare this  mapping with `rxStatusMappings.addGlobal({ 'FOO': 'WARNING' })`. But your API `Z` also returns a `"FOO"` status, which you need mapped to encore-ui's `"ERROR"` status. 

You _could_ do a transformation in your product to convert the `"FOO"` from `Z` into something else, or you can make use of `rxStatusMappings.addAPI()`, as follows:

    rxStatusMappings.addAPI('z', { 'FOO': 'ERROR' })

Then in your template code, you would use `rx-status-column` as:

    <td rx-status-column status="{{ status }}" api="z">

This will tell encore-ui that it should first check if the passed in `status` was defined separately for an api `"z"`, and if so, to use that mapping. If `status` can't be found in the mappings defined for `"z"`, then it will fall back to the mappings you defined in your `.addGlobal()` call.

## mapToActive()/mapToWarning()/mapToError()/mapToInfo()

While `.addGlobal()` and `.addAPI()` would be sufficient on their own, they can be slightly cumbersome. If you have a list of statuses that all need to get mapped to the same encore-ui status, the mapping object will be forced to have repetition, leaving room for errors. For example, something like this:

    rxStatusMappings.addGlobal({
        'BLOCKED': 'ERROR',
        'SHUTDOWN': 'ERROR',
        'FAILED': 'ERROR'
    });

There is required repetition of `"ERROR"` in each pair, and there's always the chance of misspelling `"ERROR"`. Instead, we provide a utility method `mapToError` to help with this:

    rxStatusMappings.mapToError(['BLOCKED', 'SHUTDOWN', 'FAILED']);

This has the advantage that it's shorter to type, eliminates the chance of mistyping or misassigning `"ERROR"`, and keeps all `"ERROR"` mappings physically grouped. WIth this, you could easily keep your mapping values in an Angular `.value` or `.constant`, and just pass them to these methods in your `.run()` method.

There are equivalent `mapToWarning`, `mapToActive`, and `mapToInfo` methods.

All four of these methods can take an array or a single string as the first argument. The call above is equivalent to this group of individual calls:

    rxStatusMappings.mapToError('BLOCKED');
    rxStatusMappings.mapToError('SHUTDOWN');
    rxStatusMappings.mapToError('FAILED');

All four can also take `api` as a second, optional parameter. Thus we could define the `rxStatusMappings.addAPI({ 'FOO': 'ERROR' }, 'z')` example from above as:

    rxStatusMappings.mapToError('FOO', 'z');


## getInternalMapping()

`rxStatusMappings` defines a `getInternaMapping(statusString, api)` method, which the framework uses to map a provided `status` string based on the mapping rules from all the methods above. It's intended for internal use, but there's nothing stopping you from using it if you find a need.

If you ask it to map a string that is not registered for a mapping, it will return back that same string.
