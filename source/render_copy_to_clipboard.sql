/*-------------------------------------
 * APEX Resize Dialog
 * Version: 1.0 (05-01-2016)
 * Author:  Dick Dral
 *-------------------------------------
*/
FUNCTION render_copy_to_clipboard(p_dynamic_action IN apex_plugin.t_dynamic_action,
                               p_plugin         IN apex_plugin.t_plugin)
  RETURN apex_plugin.t_dynamic_action_render_result IS
  --
  -- plugin attributes
  l_result       apex_plugin.t_dynamic_action_render_result;
  --
BEGIN
  --
  l_result.javascript_function := 'apexcopytoclipboard.doIt';
  --
  RETURN l_result;
  --
END render_copy_to_clipboard;