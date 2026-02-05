/**
 * Pot2Obsidian - Pot-App Collection Plugin
 * Appends vocabulary to Obsidian markdown file in flashcard format
 *
 * Path is automatically read from ~/.pot2obsidian/config.json
 * which is written by the Obsidian Pot2Obsidian plugin
 */

/**
 * Get shared config path (hardcoded for reliability)
 * @param {function} run - Pot-App run utility
 * @param {string} osType - Operating system type
 * @returns {string} Config file path
 */
async function getConfigPath(run, osType) {
    if (osType === 'Windows_NT') {
        // Get USERPROFILE via PowerShell
        try {
            const result = await run('powershell', [
                '-NoProfile', '-Command',
                '[System.Environment]::GetFolderPath("UserProfile")'
            ]);
            const homeDir = (typeof result === 'string' ? result : (result.stdout || '')).trim();
            if (homeDir) {
                return `${homeDir}\\.pot2obsidian\\config.json`;
            }
        } catch (e) {
            // Fallback
        }
        return 'C:\\Users\\' + (await getWindowsUsername(run)) + '\\.pot2obsidian\\config.json';
    } else {
        // macOS/Linux
        try {
            const result = await run('sh', ['-c', 'echo $HOME']);
            const homeDir = (typeof result === 'string' ? result : (result.stdout || '')).trim();
            if (homeDir) {
                return `${homeDir}/.pot2obsidian/config.json`;
            }
        } catch (e) {
            // Fallback
        }
        return '/tmp/.pot2obsidian/config.json';
    }
}

/**
 * Get Windows username as fallback
 */
async function getWindowsUsername(run) {
    try {
        const result = await run('powershell', ['-NoProfile', '-Command', '$env:USERNAME']);
        return (typeof result === 'string' ? result : (result.stdout || 'Default')).trim();
    } catch (e) {
        return 'Default';
    }
}

/**
 * Read shared config from Obsidian plugin
 * @param {function} run - Pot-App run utility
 * @param {string} osType - Operating system type
 * @returns {object} Config object
 */
async function readSharedConfig(run, osType) {
    const configPath = await getConfigPath(run, osType);

    try {
        let result;
        if (osType === 'Windows_NT') {
            result = await run('powershell', [
                '-NoProfile', '-Command',
                `if (Test-Path '${configPath}') { Get-Content -Path '${configPath}' -Raw -Encoding UTF8 } else { throw 'not found' }`
            ]);
        } else {
            result = await run('cat', [configPath]);
        }

        const output = (typeof result === 'string' ? result : (result.stdout || '')).trim();
        if (output) {
            return JSON.parse(output);
        }
    } catch (e) {
        throw new Error(
            `无法读取配置文件: ${configPath}\n` +
            '请先在 Obsidian 中安装并配置 Pot2Obsidian 插件'
        );
    }

    throw new Error('配置文件为空，请在 Obsidian 的 Pot2Obsidian 插件中设置路径');
}

/**
 * Format translation target to readable text
 * @param {string|object} target - Translation result
 * @returns {string} Formatted text
 */
function formatTarget(target) {
    if (typeof target === 'string') {
        return target;
    }

    if (typeof target === 'object' && target.explanations) {
        let result = '';
        for (const explanation of target.explanations) {
            const trait = explanation.trait || '';
            const explains = explanation.explains || [];
            if (trait) {
                result += trait + '. ';
            }
            result += explains.join('; ');
            result += '\n';
        }
        return result.trim();
    }

    return String(target);
}

/**
 * Append content to file on Windows using PowerShell
 */
async function appendFileWindows(filePath, content, run) {
    // Escape for PowerShell double-quoted string
    const escapedContent = content
        .replace(/`/g, '``')
        .replace(/"/g, '`"')
        .replace(/\$/g, '`$')
        .replace(/\r?\n/g, '`n');

    const escapedPath = filePath.replace(/'/g, "''");
    const command = `Add-Content -Path '${escapedPath}' -Value "${escapedContent}" -Encoding UTF8 -NoNewline`;

    await run('powershell', ['-NoProfile', '-Command', command]);
}

/**
 * Append content to file on Unix (macOS/Linux)
 */
async function appendFileUnix(filePath, content, run) {
    const escapedContent = content
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\$/g, '\\$')
        .replace(/`/g, '\\`');

    const escapedPath = filePath.replace(/'/g, "'\\''");
    await run('sh', ['-c', `printf "%b" "${escapedContent}" >> '${escapedPath}'`]);
}

/**
 * Main collection function
 * @param {string} source - Original word/text
 * @param {string|object} target - Translation result
 * @param {object} options - Plugin options
 */
async function collection(source, target, options = {}) {
    const { utils } = options;
    const { run, osType } = utils;

    // Always read from shared config (set by Obsidian plugin)
    const sharedConfig = await readSharedConfig(run, osType);
    const filePath = sharedConfig.file_path;

    if (!filePath) {
        throw new Error('配置中缺少 file_path，请在 Obsidian 的 Pot2Obsidian 插件中设置');
    }

    // Format content as flashcard
    const formattedTarget = formatTarget(target);
    const flashcard = `\n${source}\n?\n${formattedTarget}\n\n`;

    // Append to file based on OS
    if (osType === 'Windows_NT') {
        await appendFileWindows(filePath, flashcard, run);
    } else {
        await appendFileUnix(filePath, flashcard, run);
    }
}
