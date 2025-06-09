## TODO

- add attack_in_progress and defend_in_progress sample data.
- rewrite Galaxy.jsx to use getCampaign()
- using x_in_progress, extend map functionality to
    - show in_progress regions
    - show hovering progress bar over in_progress regions
    - show hovering progress bar over active event region(s).
    - when enemy world is taken, show "superearth" region instead
- show superEarth under attack.
- tooltip shows progress bar for capture progress
- tooltip shows progress bar for defend progress
- tooltip shows progress bar for attack progress

## 0.6.2 (2025-06-10)

-

## 0.6.1 (2025-06-09)

- Fixes to get Docker working (again).
- Responsive fixes
- code split Galaxy into:
    - Galaxy.jsx
        - Map.jsx & Map.css
        - Tooltip.jsx & Tooltip.css

## 0.6.0 (2025-06-09)

- Update Galaxy.jsx functionality

    - show captured regions (yellow border, yellow color)
    - show in_progress region (gold border, faction color)
    - show lost region (dark/transparent)
    - hover tooltip over regions to show region name

- Create Timeline.jsx component
    - show list of all defend/attack events, sorted by start_time
